# Estado atual e evidências

> Levantamento estático em 16/09/2026. Evidência de código não equivale a funcionamento homologado.

O usuário aprovou e autorizou a organização em repositório único. O código original foi movido para `frontend/`, preservando os 14 arquivos de aplicação/referência por SHA-256 e o HEAD Git. `backend/` contém a base Django/DRF, modelo de usuário, migração inicial, configuração local e liveness. `infra/` contém PostgreSQL local opcional e diretrizes; `docs/` permanece na raiz. Sessões dos portais, subdomínios, worker e fluxos de negócio ainda não foram implementados.

## Inventário

| Componente | Evidência | Situação |
| --- | --- | --- |
| Aplicação web | [package.json](../frontend/package.json) | Next.js 15.3.2, React e React DOM 19.1.0; JavaScript |
| Página pública | [app/page.js](../frontend/app/page.js) | Oferta, navegação, FAQ, preview visual de dashboard e depoimentos de exemplo |
| Layout | [app/layout.js](../frontend/app/layout.js) | Idioma pt-BR, metadados e viewport |
| Estilos | [globals.css](../frontend/app/globals.css), [home-nav.css](../frontend/app/home-nav.css), [testimonials.css](../frontend/app/testimonials.css) | CSS responsivo; fontes externas; não há relatório de acessibilidade |
| Entrada e cadastro | [acessar/page.js](../frontend/app/acessar/page.js) | Interface apenas; submit exibe mensagem local; botão Google sem fluxo autenticado |
| Checkout | [checkout/page.js](../frontend/app/checkout/page.js), [PagBankTransparentForm.js](../frontend/app/checkout/PagBankTransparentForm.js) | Formulário, SDK, cotação e requisição ao backend; homologação não demonstrada |
| Sessão PagBank | [session/route.js](../frontend/app/api/pagbank/session/route.js) | GET interno inicia sessão externa via POST; depende de credenciais |
| Cobrança PagBank | [payment/route.js](../frontend/app/api/pagbank/payment/route.js) | POST de transação XML; validação mínima; retorna código |
| Configuração | [.env.example](../frontend/.env.example), [.gitignore](../.gitignore) | Nomes de variáveis e exclusão de arquivos locais; nenhum segredo copiado para os documentos |
| Referência estática | [index.html](../frontend/index.html) | Página HTML com Tailwind por CDN; não é a rota raiz do App Router |
| Dependências | [package-lock.json](../frontend/package-lock.json) | Lockfile existente; ausência de auditoria de vulnerabilidades nesta entrega |

Scripts da raiz: `npm run frontend:install`, `npm run dev`, `npm run build`, `npm start`, `npm run typecheck` e verificações documentais. Frontend agora tem configuração TypeScript incremental e lockfile próprio. Backend usa Django 5.2.17 e DRF 3.18.1, dependências travadas e testes via `manage.py test --settings=config.settings.test` dentro de backend/. O modelo User é customizado antes da primeira migração; cadastro/login públicos não existem. Os demais módulos de negócio e o worker são estrutura inicial. `.venv/`, `node_modules/` e `.next/` permanecem ignorados pelo Git.

Nesta organização, o build Next.js passou com um aviso no CSS original de acesso, e seis testes da fundação Django passaram usando SQLite em memória. Isso não valida PostgreSQL, PagBank ou jornadas do produto. Nenhuma migração foi aplicada a banco externo e nenhum checkout foi acionado.

## Achados prioritários

| ID | Evidência e consequência | Prioridade / ação planejada |
| --- | --- | --- |
| AT-01 | `JSON.stringify({ cardToken, senderHash, installment, form })` envia todo `form`, que contém `cardNumber`, `cvv` e `expiration`, ao backend próprio | P0 antes de cobrança real: DEV-013; definir lista explícita de campos e testar ausência de cartão em payload/logs |
| AT-02 | Backend extrai `<code>` e frontend chama `onApproved`; não verifica estado financeiro antes de mostrar “Assinatura aprovada” | P0: DEV-015/016; estados pendente/pago/recusado e confirmação autoritativa |
| AT-03 | Parcela e valor de parcela vêm do navegador; backend só confere campos mínimos | P0: DEV-013/014; cotação validada e pedido imutável |
| AT-04 | Referência usa novo UUID por requisição; não há pedido persistido, webhook, sessão de cliente ou idempotência | P0: DEV-009 e DEV-014/015; timeout/retry não pode duplicar cobrança |
| AT-05 | Tela de acesso não cria conta, sessão ou recuperação | Bloqueador funcional: DEV-008 a DEV-011 |
| AT-06 | Links de termos e privacidade apontam a âncoras sem seções correspondentes; depoimentos são modelos | Bloqueador de publicação: DEV-043 e revisão operacional |
| AT-07 | Landing anuncia 1, 6 ou 12 parcelas; formulário filtra qualquer quantidade até 12 | Decisão comercial H-05 antes de DEV-013; alinhar oferta e opções efetivas |
| AT-08 | Tratamento de XML por expressão regular, sem estratégia explícita de timeout, reconsulta e estados indeterminados | DEV-012/015 e DEV-046; confirmar contrato da API e testar erros |
| AT-09 | Não há persistência ou controles para casos, documentos e permissões | DEV-005 a DEV-044; não anunciar funcionalidades como entregues |

P0 significa prioridade antes de operação financeira real; não significa que um incidente já ocorreu. O levantamento não inspecionou logs de produção nem confirma exposição histórica.

## Correções documentais desta entrega

O README passou a apresentar o projeto completo e o status real. A referência divergente a Mercado Pago foi corrigida para PagBank; os comandos locais e as variáveis úteis foram mantidos. A árvore foi atualizada, e as seções originais 27–39 foram preservadas em [Diretrizes originais](DIRETRIZES_ORIGINAIS.md).

## Critério para atualizar status

Só registrar “validado” com ambiente, data, cenário, resultado e evidência. Integração PagBank requer testes de sandbox com conta habilitada. Revisão estática desta documentação não substitui teste de cobrança, teste de invasão, auditoria ou homologação.
