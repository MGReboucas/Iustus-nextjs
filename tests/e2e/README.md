# Testes de navegador

Três jornadas Playwright: cadastro/verificação/login/recuperação do cliente; MFA, convite de advogado e recuperação do administrador; isolamento dos portais e CSRF. Fixtures usam exclusivamente contas sintéticas e o banco iustus_e2e. Traces e screenshots automáticos ficam desativados para não persistir fatores e tokens.

Preparar o banco, compilar o frontend e executar npm run test:e2e pela raiz. O runner inicia e encerra seus servidores; portas 3000/8000 precisam estar livres. No Windows local, PLAYWRIGHT_CHANNEL=msedge usa o Edge instalado; CI instala Chromium. [Comandos completos](../../docs/ACESSO.md) · [Plano dos demais testes](../../docs/TESTES.md).
