# Frontend Iustus

Aplicação Next.js existente, preservada em `app/`, com configuração TypeScript para adoção incremental. As telas JavaScript e CSS não foram reescritas. `index.html` permanece uma referência estática; não é a página servida pelo Next.js.

Na raiz do repositório:

```bash
npm run frontend:install
npm run dev
npm run typecheck
npm run build
npm start
```

Em PowerShell com bloqueio de scripts, usar `npm.cmd` no lugar de `npm`; não é necessário alterar a política de execução. As dependências e o lockfile ficam nesta pasta. Na primeira instalação, `frontend:install` executa `npm ci` aqui.

Copiar `.env.example` para `.env.local` nesta pasta somente para configurar o checkout de sandbox. Não colocar segredos em variáveis `NEXT_PUBLIC_`. Os arquivos de ambiente não são carregados a partir da raiz.

A API Django inicial roda separadamente em `127.0.0.1:8000`; as telas ainda não a consomem. A integração dos portais e a migração PagBank continuam no backlog. As rotas financeiras legadas foram preservadas, incluindo os achados descritos em [Estado atual](../docs/ESTADO_ATUAL.md); não foram homologadas para cobrança real.
