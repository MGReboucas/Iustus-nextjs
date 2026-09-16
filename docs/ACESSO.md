# Acesso local: cliente e equipe

> Marco de 16/09/2026: autenticação integrada e testada localmente. Não é liberação de produção; use somente dados fictícios.

## Entregue

Cadastro com senha validada pelo Django, confirmação de e-mail e reenvio; login/logout e recuperação de senha; revogação de sessões após reset; convite de advogado pelo administrador com MFA; TOTP e oito códigos de recuperação de uso único; painéis iniciais com perfil real e permissões por portal. Há fila durável de e-mails de identidade com conteúdo criptografado, lease e retry. Localmente, mensagens viram arquivos, sem envio externo.

Gestão de casos/documentos, assinatura, migração financeira, edição de perfil, troca de dispositivo MFA e reemissão de códigos ainda não estão implementadas. Login Google foi removido da tela por não ter integração.

## Preparar

Na raiz, com Node 24 e Python 3.12–3.14 instalados:

```powershell
npm.cmd run frontend:install
python -m venv backend/.venv
.\backend\.venv\Scripts\python.exe -m pip install -r backend/requirements.lock
.\backend\.venv\Scripts\python.exe infra/setup_local.py --postgres-bin 'C:\Program Files\PostgreSQL\18\bin' --start-db
.\backend\.venv\Scripts\python.exe backend/manage.py migrate
```

O caminho PostgreSQL é um exemplo da instalação encontrada. O script usa apenas `.local/postgres`, porta **55432**, banco `iustus`, preservando o serviço preexistente. Sem `--start-db`, gera somente os arquivos de configuração; é possível configurar outro PostgreSQL em DATABASE_URL. O Compose opcional tem porta/senha próprias e requer ajustar a conexão.

As chaves persistentes ficam em `backend/.env` e `frontend/.env.local`, fora do Git; arquivos existentes não são sobrescritos. A chave Fernet deve ser preservada junto com backups, pois protege MFA e corpos da fila. Se o alias `python` não funcionar, use o caminho da instalação Python apenas para criar a venv.

## Iniciar

Executar cada comando em um terminal separado, na raiz:

```powershell
.\backend\.venv\Scripts\python.exe backend/manage.py runserver 127.0.0.1:8000 --noreload
npm.cmd --prefix frontend run dev -- --hostname 127.0.0.1 --port 3000
.\backend\.venv\Scripts\python.exe backend/manage.py deliver_identity_mail
```

| Área | Endereço local |
| --- | --- |
| Cliente | http://localhost:3000/acessar |
| Equipe | http://127.0.0.1:3000/acessar |
| Liveness Django | http://127.0.0.1:8000/api/v1/health/ |

Cookies diferenciam `localhost` e `127.0.0.1`. Mantenha o endereço correto; subdomínios reais e HTTPS ainda serão configurados. Para encerrar o PostgreSQL exclusivo do projeto, use pg_ctl com `-D .local/postgres stop`; não pare o serviço preexistente do computador.

## Cliente

Criar conta pelo portal do cliente. O worker grava a mensagem em `.local/mail/`; abrir o arquivo de texto e usar o link. A confirmação exige clique explícito. Tokens usam fragmento de URL, removido do histórico pela tela, e não aparecem no request HTTP/Referer. Depois de confirmar o e-mail, entrar e acessar `/cliente`. Recuperação e reenvio seguem o mesmo fluxo de mensagens locais.

O cadastro registra o aviso de testes `development-v1` no usuário e na auditoria. Esse aviso não substitui política de privacidade, termos comerciais aprovados ou contrato jurídico. Cadastro não ativa assinatura nem cobrança.

## Administrador e advogados

Na raiz, escolher um e-mail fictício e executar:

```powershell
.\backend\.venv\Scripts\python.exe backend/manage.py bootstrap_admin admin@example.test --name 'Administrador de teste'
```

A senha é solicitada sem aparecer na linha de comando. O operador do servidor declara o endereço verificado; bootstrap não é endpoint público, só cria o primeiro administrador e não promove contas existentes. MFA continua obrigatório. Não usar `createsuperuser` para conceder papéis do produto.

Entrar no portal da equipe, adicionar a chave exibida ao autenticador TOTP por tempo e confirmar o código de seis dígitos. Guardar os oito códigos de recuperação, exibidos uma única vez. O administrador acessa `/advogado` e convida os dois advogados; cada convidado define senha e configura o próprio fator. Convites públicos nunca concedem ADMIN.

Perder todos os fatores/códigos não habilita recuperação de MFA só por e-mail. Recuperação excepcional e troca de dispositivo ainda precisam de procedimento operacional e implementação própria antes de produção.

## Controles implementados e limites

O navegador usa `/api/v1` na mesma origem. O proxy Next.js aceita somente hosts/rotas configurados e corpo de até 256 KiB. Descarta headers de encaminhamento enviados pelo navegador e define X-Iustus-Portal-Host a partir do host validado, junto com uma chave privada. Django verifica a chave, aplica allowlist e vincula sessão ao portal. X-Forwarded-Host não escolhe o portal.

CSRF é obrigatório também em login e mutações anônimas. Respostas privadas são no-store; cookies são HttpOnly, sem armazenamento de sessão em localStorage. HTTP local usa cookies sem Secure; HTTPS e prefixo __Host- produtivos permanecem pendentes. Segredos de MFA são criptografados com Fernet e códigos são verificados por PyOTP; contador impede reuso do mesmo OTP. Recuperações e tokens de ação ficam como hashes; reset invalida sessões e desafios anteriores.

Limites iniciais: cliente com 24h absolutas/2h ocioso; equipe com 12h/30 min; desafio MFA de 5 min; recuperação de senha de 1h; verificação/convite de 24h. Rate limit usa PostgreSQL, por ação/conta e limite agregado por portal. Não presume IP confiável do navegador. Limites de produção, proteção de borda, rotação de chaves e limpeza programada de tokens/contadores ainda requerem revisão.

O worker tenta cada e-mail até cinco vezes com backoff e lease de cinco minutos. Após entrega, apaga o corpo criptografado da fila. Falha entre envio e confirmação pode repetir a mensagem, mas o token continua de uso único. SMTP não foi configurado; não houve envio a destinatários reais.

## Testar

Dentro de backend:

```powershell
.\.venv\Scripts\python.exe manage.py check
.\.venv\Scripts\python.exe manage.py test tests --settings=config.settings.test_postgres --noinput
.\.venv\Scripts\python.exe manage.py makemigrations --check --dry-run --settings=config.settings.test
```

22 testes usam banco separado, incluindo consumo concorrente do mesmo TOTP. A alternativa `config.settings.test` usa SQLite em memória e pula o teste de locks reais. O usuário PostgreSQL de testes precisa poder criar banco; isso não é recomendação de privilégio para produção.

Para navegador, parar os servidores das portas 3000/8000 e executar na raiz:

```powershell
.\backend\.venv\Scripts\python.exe tests/e2e/fixture.py prepare
npm.cmd run build
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm.cmd run test:e2e
```

O runner inicia/encerra seus servidores e usa somente `iustus_e2e`. As três jornadas cobrem cliente, equipe e isolamento. Fixtures só aceitam endereços sintéticos `e2e-*@example.test`. No Linux/CI, instalar Chromium pelo Playwright e omitir PLAYWRIGHT_CHANNEL. O workflow inclui PostgreSQL e navegador; execução local não comprova aprovação remota no GitHub.

## Antes de publicar

Homologar domínios/TLS, infraestrutura de proxy, settings produtivos, gestão e backup das chaves, provedor de e-mail, políticas jurídicas, recuperação MFA excepcional, retenção/auditoria, monitoramento e aceite operacional. Corrigir/migrar o checkout legado antes de cobrança real. As dependências do frontend foram atualizadas dentro das linhas Next.js 15 e React 19.1; isso não constitui auditoria completa de segurança.
