# Cliente da API

client.ts usa fetch na mesma origem, cookies de sessão, erros tipados e CSRF renovado antes das mutações. Não guarda credenciais em localStorage. O Route Handler app/api/v1 valida host, limita corpo e define o contexto privado do portal antes de encaminhar ao Django.

contracts.ts mantém o tipo de liveness. Contratos de identidade implementados e contratos de negócio futuros: [API](../../../../docs/API.md). [Configuração local](../../../../docs/ACESSO.md).
