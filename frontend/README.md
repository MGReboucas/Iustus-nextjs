# Frontend Next.js

Next.js 15.5.25 / React 19.1.9, com TypeScript incremental. Acesso e painéis usam a API Django através do proxy de mesma origem /api/v1. Cadastro, confirmação, recuperação, convites e MFA estão integrados; sessões não são guardadas em localStorage.

Na raiz, npm run frontend:install instala frontend/package-lock.json; npm run dev, build e typecheck encaminham comandos para esta pasta. No PowerShell com restrição a scripts, usar npm.cmd.

Para preparar os dois portais e o backend, seguir [Acesso local](../docs/ACESSO.md). As variáveis privadas ficam em frontend/.env.local. Nunca colocar a chave do proxy ou segredos em NEXT_PUBLIC_.

Landing e código do checkout foram preservados. As rotas PagBank ainda são legadas e mantêm as limitações de [Estado atual](../docs/ESTADO_ATUAL.md); não estão homologadas para cobrança real. Painéis exibem perfil, casos persistidos e operações de triagem conforme o papel. [Guia de casos](../docs/CASOS.md).
