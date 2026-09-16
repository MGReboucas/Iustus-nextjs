# Plano de segurança

> Controles de acesso implementados e testados localmente: CSRF em mutações anônimas, sessões vinculadas ao portal, MFA com proteção contra reuso concorrente, hashes de tokens, criptografia dos fatores/fila e rate limit persistido. Detalhes e limites em [Acesso local](ACESSO.md). As metas e controles produtivos abaixo continuam sujeitos a homologação.

> Controles propostos e achados estáticos. Não é certificação, teste de invasão ou declaração de conformidade.

## Prioridade imediata para o desenvolvimento

AT-01 a AT-04 precisam ser resolvidos antes de cobrança real: não transmitir dados brutos de cartão ao backend próprio; não confundir código de transação com pagamento confirmado; validar cotação no servidor; persistir pedido e idempotência. Os arquivos atuais permanecem inalterados nesta etapa documental. Ver [Estado atual](ESTADO_ATUAL.md) e DEV-012 a DEV-016.

## Ameaças e controles

| Ameaça | Fronteira | Controle e evidência esperada |
| --- | --- | --- |
| Cliente consulta caso de terceiro | Navegador → API → banco | Autorizar por vínculo; teste trocando todos os IDs de casos, documentos e exportações |
| Advogado consulta caso não atribuído | API → dados jurídicos | Filtro por atribuição ativa; teste depois de transferência |
| Autoelevação de privilégio | Cadastro e administração | Papéis ignorados no cadastro público; MFA administrativo; testes de mass assignment |
| Sequestro de sessão / CSRF | Navegador → autenticação | Cookies seguros, expiração, revogação, checagem de origem e proteção CSRF compatível com provedor |
| Vazamento de cartão / segredo | Cliente → backend / logs | Payload allowlist, redaction e fixtures sintéticas para provar ausência de PAN, CVV e tokens |
| Cobrança repetida / falsa confirmação | Aplicação → provedor | Pedido persistido, idempotência, conciliação, estados indeterminados e validação do evento |
| Notificação financeira forjada | Provedor → endpoint público | Mecanismo oficial do produto confirmado; reconsulta autenticada quando aplicável; replay deduplicado |
| Arquivo malicioso / público | Upload → objetos → download | Quarentena, MIME real, limite, scanner e URL curta; negar leitura anônima |
| Nota interna aparece ao cliente | Domínio → DTO / exportação | Visibilidade centralizada e testes em API, tela, e-mail e pacote exportado |
| Injeção e XSS | Entrada → banco / interface | Queries parametrizadas, validação, texto escapado; impedir HTML arbitrário em mensagens |
| SSRF em integrações | Worker/API → rede | Destinos fixos permitidos; não consultar URL arbitrária enviada em evento ou formulário |
| Corrida em atribuição/publicação | Requisições concorrentes → banco | Transação, restrição de unicidade e versão otimista; teste de corrida |
| Perda de arquivos ou banco | Serviços → operação | Backup, versionamento, restauração ensaiada e monitoramento |
| Administrador excessivamente privilegiado | Operação → conteúdo | Metadados mínimos, concessão temporária com aprovador distinto e auditoria |

## Identidade e sessão

Usar identidade Django com componentes mantidos para verificação e MFA; configurar política de senha, tokens de uso único, bloqueio por abuso e MFA de equipe. Definir e testar duração de sessão em DEV-009; proposta inicial: expiração absoluta de 12h e inatividade de 30 min para equipe, com reautenticação em ações privilegiadas. Para cliente, definir equilíbrio entre segurança e usabilidade em DEV-002. Senhas não entram em logs; recuperação não revela existência da conta. Cadastro/troca/recuperação de fator não pode liberar sessão profissional sem verificação reforçada.

O Django é responsável pela autorização. No DRF, exigir identidade por padrão, filtrar querysets por proprietário/atribuição e validar criação e relações recebidas; permissões de objeto sozinhas não protegem listagens e criação. O Django Admin, se habilitado, terá acesso operacional restrito, MFA e ações que preservem serviços e auditoria. Não usar superusuário na rotina nem permitir edição direta de estados financeiros ou vínculos como atalho.

Portais usam cookies host-only `__Host-iustus_session`, Secure, HttpOnly, Path=/ e SameSite=Lax, sem Domain compartilhado. O backend vincula sessão ao portal e rejeita replay no outro host. A entrada HTTPS remove headers de encaminhamento fornecidos pelo cliente e estabelece host/protocolo confiáveis; a origem Django aceita tráfego somente dessa entrada controlada. Aplicar allowlist de hosts e origens, sem CORS amplo. Validar CSRF explicitamente em login e mutações anônimas, além das autenticadas; SameSite não substitui CSRF entre subdomínios. Exceção de webhook é restrita e exige verificação financeira própria.

Dados privados não entram em cache compartilhado do Next.js; usar no-store e revalidar a sessão no Django em cada operação. Route Handlers e Server Actions, quando necessários para interface, preservam contexto individual e não substituem autorização do backend. [Documentação oficial Next.js](https://nextjs.org/docs/app/api-reference/directives/use-server).

## Integração financeira

O produto PagBank habilitado define como verificar a notificação e consultar a transação. O código atual usa integração XML; exemplos de APIs de pedidos ou recorrência não podem ser copiados supondo o mesmo contrato. Consultar [Notificações da integração existente](https://developer.pagbank.com.br/v1.0/docs/api-notificacao-v1) e [Webhooks](https://developer.pagbank.com.br/reference/webhooks) durante DEV-012. A documentação de webhooks distingue eventos e estados: a aplicação precisa reconciliar o estado real, incluindo mudanças posteriores à transação.

Proibir cartões reais em testes. Não registrar corpo bruto financeiro. Credenciais só no servidor e em cofre de ambiente; se o contrato legado usar segredo na URL, impedir que logs de aplicação/proxy capturem query string e revisar alternativa suportada em DEV-012. Não presumir escopo de certificação de pagamento resolvido apenas pela tokenização.

## Arquivos e logs

Tipos iniciais propostos: PDF, JPEG e PNG; limite de 20 MiB por arquivo. Outros tipos precisam de análise e ajuste de scanner/visualização. Nome original não compõe caminho executável; gerar chave aleatória, servir com Content-Disposition apropriado e impedir conteúdo ativo no domínio da aplicação. Arquivo em quarentena não é evidência disponível.

Logar requestId, código de ação, resultado, latência e identificadores internos mínimos. Não logar narrativa jurídica, CPF completo, cartão, senha, segredo, URL assinada ou token. Separar auditoria de negócio de log técnico e restringir consulta de ambos.

## Critérios de liberação

Validar matriz de permissões, revisar dependências e segredos, testar payload financeiro, examinar configuração de buckets/cookies/headers, ensaiar restauração e incidentes. Registrar achados com gravidade e responsável. Falha de isolamento, exposição de arquivo, cobrança duplicada ou perda de dados bloqueia produção. Auditoria independente poderá ser contratada pela operação; não está presumida como trabalho gratuito de terceiro nem concluída nesta documentação.
