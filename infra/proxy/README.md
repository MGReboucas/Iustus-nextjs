# Entrada HTTPS planejada

Nos portais cliente e profissional, encaminhar `/api/v1/*` ao Django e telas ao Next.js; o site público direciona login ao portal apropriado. Permitir apenas hosts definidos, remover headers de encaminhamento não confiáveis e restringir acesso à origem.

Sessões precisam ser vinculadas ao portal no backend e usar cookies seguros por host. Esse controle ainda não foi implementado. O arquivo executável de proxy dependerá do provedor escolhido; não há configuração genérica anunciada como pronta para produção. Consulte [Arquitetura](../../docs/ARCHITECTURE.md).
