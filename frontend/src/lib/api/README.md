# Integração HTTP

Local do futuro cliente HTTP TypeScript da API Django. `contracts.ts` descreve apenas a resposta de liveness disponível na base inicial.

As telas e as rotas PagBank existentes ainda não usam Django. A integração autenticada será implementada com `/api/v1` na mesma origem, cookies por portal, CSRF, erros tipados e respostas privadas sem cache, conforme [contrato da API](../../../../docs/API.md). Não armazenar sessão em localStorage nem acessar PostgreSQL a partir do frontend.
