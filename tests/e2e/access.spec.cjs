const { test, expect } = require('../../frontend/node_modules/@playwright/test');
const { execFileSync } = require('node:child_process');
const { createHmac, randomUUID } = require('node:crypto');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const python = process.env.IUSTUS_TEST_PYTHON || path.join(root, 'backend', '.venv', process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');
const password = 'Synthetic-Browser-Passphrase-938!';
const clientOrigin = 'http://localhost:3000';
const teamOrigin = 'http://127.0.0.1:3000';
function fixture(action, email) {
  return JSON.parse(execFileSync(python, [path.join(__dirname, 'fixture.py'), action, email], { encoding: 'utf8', windowsHide: true, timeout: 15000 }));
}
function mailLink(email) { return fixture('mail', email).body.match(/http[^\s]+/)[0]; }
function email() { return `e2e-${randomUUID()}@example.test`; }
function otp(secret) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const bits = [...secret].map(c => alphabet.indexOf(c).toString(2).padStart(5, '0')).join('');
  const key = Buffer.from((bits.match(/.{8}/g) || []).map(byte => parseInt(byte, 2)));
  const counter = Buffer.alloc(8); counter.writeBigUInt64BE(BigInt(Math.floor(Date.now() / 30000)));
  const hash = createHmac('sha1', key).update(counter).digest();
  const offset = hash[hash.length - 1] & 15;
  return String((hash.readUInt32BE(offset) & 0x7fffffff) % 1000000).padStart(6, '0');
}
async function signIn(page, origin, address, secret = password) {
  await page.goto(origin + '/acessar');
  await page.getByLabel('E-mail', { exact: true }).fill(address);
  await page.getByLabel('Senha', { exact: true }).fill(secret);
  await page.getByRole('button', { name: 'Acessar plataforma' }).click();
}
async function enroll(page) {
  const secret = await page.getByTestId('mfa-secret').textContent();
  await page.getByLabel('Código do autenticador', { exact: true }).fill(otp(secret));
  await page.getByRole('button', { name: 'Confirmar segundo fator' }).click();
  await expect(page.getByRole('heading', { name: 'Guarde seus códigos de recuperação' })).toBeVisible();
  const codes = await page.locator('.recovery-codes li code').allTextContents();
  await page.getByRole('button', { name: 'Guardei os códigos. Continuar' }).click();
  await expect(page).toHaveURL(/\/advogado$/);
  return codes;
}

test('cliente cadastra, verifica e-mail, acessa painel e redefine senha', async ({ page }) => {
  const address = email();
  await page.goto(clientOrigin + '/acessar');
  await page.getByRole('button', { name: 'Criar conta', exact: true }).click();
  await page.getByLabel('Nome completo').fill('Cliente de Teste');
  await page.getByLabel('E-mail', { exact: true }).fill(address);
  await page.getByLabel('Senha', { exact: true }).fill(password);
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Criar minha conta' }).click();
  await expect(page.getByRole('status')).toContainText('Confira seu e-mail');
  await page.goto(mailLink(address));
  await page.getByRole('button', { name: 'Confirmar meu e-mail' }).click();
  await expect(page.getByRole('status')).toContainText('E-mail confirmado');
  await signIn(page, clientOrigin, address);
  await expect(page.getByRole('heading', { name: 'Olá, Cliente de Teste.' })).toBeVisible();
  await page.getByRole('button', { name: 'Sair da conta' }).click();
  await expect(page).toHaveURL(/\/acessar$/);
  await page.getByRole('button', { name: 'Esqueci minha senha' }).click();
  await page.getByLabel('E-mail', { exact: true }).fill(address);
  await page.getByRole('button', { name: 'Enviar recuperação' }).click();
  await expect(page.getByRole('status')).toContainText('instruções');
  await page.goto(mailLink(address));
  const changed = 'Changed-Browser-Passphrase-651!';
  await page.getByLabel('Nova senha').fill(changed);
  await page.getByRole('button', { name: 'Salvar nova senha' }).click();
  await expect(page.getByRole('status')).toContainText('Senha atualizada');
  await signIn(page, clientOrigin, address, changed);
  await expect(page.getByRole('heading', { name: 'Olá, Cliente de Teste.' })).toBeVisible();
});

test('administrador confirma MFA, convida advogado e usa recuperação uma vez', async ({ browser }) => {
  const admin = email(), lawyer = email();
  fixture('admin', admin);
  const context = await browser.newContext();
  const page = await context.newPage();
  await signIn(page, teamOrigin, admin);
  const codes = await enroll(page);
  await page.getByLabel('E-mail do profissional').fill(lawyer);
  await page.getByRole('button', { name: 'Enviar convite' }).click();
  await expect(page.getByRole('status')).toContainText('convite');
  const other = await browser.newContext();
  const professional = await other.newPage();
  await professional.goto(mailLink(lawyer));
  await professional.getByLabel('Nome completo').fill('Advogado de Teste');
  await professional.getByLabel('Senha', { exact: true }).fill(password);
  await professional.getByRole('button', { name: 'Aceitar convite' }).click();
  await expect(professional.getByRole('status')).toContainText('Convite aceito');
  await signIn(professional, teamOrigin, lawyer);
  await enroll(professional);
  await expect(professional.getByRole('heading', { name: 'Olá, Advogado de Teste.' })).toBeVisible();
  await expect(professional.getByRole('heading', { name: 'Convidar advogado' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Sair da conta' }).click();
  await expect(page).toHaveURL(/\/acessar$/);
  await signIn(page, teamOrigin, admin);
  await page.getByLabel('Código do autenticador ou de recuperação').fill(codes[0]);
  await page.getByRole('button', { name: 'Confirmar segundo fator' }).click();
  await expect(page.getByRole('heading', { name: 'Olá, Admin Teste.' })).toBeVisible();
  await other.close(); await context.close();
});

test('rotas e headers de outro portal são recusados', async ({ request }) => {
  expect((await request.get(clientOrigin + '/advogado')).status()).toBe(403);
  expect((await request.get(teamOrigin + '/cliente')).status()).toBe(403);
  const result = await request.get(clientOrigin + '/api/v1/auth/csrf', {
    headers: { 'X-Forwarded-Host': '127.0.0.1:3000', 'X-Iustus-Portal-Host': '127.0.0.1:3000', 'X-Iustus-Proxy-Key': 'forged' },
  });
  expect((await result.json()).portal).toBe('client');
  const login = await request.post(clientOrigin + '/api/v1/auth/login', { data: { email: email(), password } });
  expect(login.status()).toBe(403);
  expect((await login.json()).error.code).toBe('CSRF_FAILED');
});
