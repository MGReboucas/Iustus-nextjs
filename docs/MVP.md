# Escopo do MVP

> Baseline proposta em 16/09/2026. Hipóteses de negócio ainda pendentes em [Decisões](DECISOES.md).

**Áreas confirmadas:** multas de trânsito e direito civil em geral, excluindo apenas família e sucessões do civil, por escritório próprio no Rio Grande do Norte com dois advogados. Atuação civil completa confirmada: ajuizar, defender, protocolar e acompanhar. Consumo, imobiliário e demais matérias civis permanecem incluídos; exemplos não fecham o catálogo. Checklists e cobertura contratual por fase ainda serão detalhados em [Regras do serviço](REGRAS_DO_SERVICO.md). O planejamento inclui cadastro de processos/partes, agenda de audiências e etapas da atuação judicial; registro manual nos sistemas oficiais não equivale à exclusão de atuação judicial.

## Incluído

- Página pública coerente com o serviço aprovado; termos, privacidade e cadastro verificado.
- Login, recuperação, sessão, bloqueio e convites para equipe; MFA para acessos privilegiados.
- Contratação anual por cartão via PagBank, pedido persistido, confirmação confiável, idempotência, vigência e tratamento de estorno/contestação.
- Caso em rascunho, submissão, atribuição manual, triagem, pendências, transições e encerramento.
- Arquivos privados, quarentena, verificação, versões e downloads autorizados.
- Dashboards de cliente e advogado com busca, paginação, timeline e mensagens assíncronas.
- Procuração gerada de modelo aprovado, assinatura realizada externamente, devolução e conferência humana.
- Peças versionadas, revisão explícita, publicação e exportação do conteúdo visível ao cliente.
- Registro manual de protocolo, movimentações e prazos informados pelo advogado, com lembretes.
- Processos civis como autor ou réu, petições iniciais e defesas, agenda de audiências e plano de etapas contratadas, sem encerramento automático ao entregar uma peça.
- Administração mínima, trilha de auditoria, solicitações de privacidade, retenção, monitoramento e recuperação.

Todos os 43 requisitos funcionais são MUST dentro desta baseline revisada. Se orçamento ou prazo exigirem redução, aprovar novo escopo e recalcular; não esconder exclusões dentro da contingência. A revisão civil acrescentou 80h técnicas; o detalhamento das subcategorias pode exigir nova revisão.

## Fora da primeira versão

**Fora do escopo jurídico civil por decisão do usuário:** família e sucessões. As exclusões técnicas abaixo dizem respeito a funcionalidades do software, não criam novas exclusões de matérias civis.

Integração automática com tribunais, protocolo eletrônico automatizado, cálculo jurídico automático de prazos, assinatura eletrônica embutida por API, geração de defesa por IA, aplicativo nativo, WhatsApp, chat em tempo real, marketplace de advogados, múltiplos escritórios isolados, login Google, Pix/boleto, cobrança recorrente automática, planos múltiplos, cupons e relatórios analíticos avançados.

O botão Google existente deverá ser removido ou ocultado até haver implementação autorizada. Parcelamento anual não cria cobrança mensal recorrente. A contratação de assinatura externa não está incluída nas horas; o MVP registra o arquivo assinado e sua conferência.

## Critérios para Feature Complete — M8

Todos os requisitos funcionais implementados no ambiente de homologação, permissões verificadas por tarefa, regras críticas testadas, migrações reproduzíveis e documentação atualizada. A regressão transversal da fase 13 ainda será executada. M8 não significa disponibilidade ao público.

## Critérios para produção — M10

Roteiro de homologação aprovado por responsáveis identificados; nenhuma falha bloqueadora aberta; pagamento confirmado em sandbox e configuração produtiva conferida; restauração demonstrada; alertas e responsável operacional definidos; políticas e modelos aprovados; critérios RNF verificados ou ajustados formalmente; implantação e reversão ensaiadas.

Não publicar com acesso cruzado, cobrança duplicada, falsa aprovação financeira, documento privado público, perda de dados ou ausência de recuperação. Desvios cosméticos podem ser aceitos com responsável, justificativa e tarefa posterior.

## Estratégia de entrega

Um frontend Next.js + TypeScript e um backend modular Python + Django REST Framework, com PostgreSQL, objetos privados e worker Python separado, dimensionados inicialmente para um escritório/operação. O primeiro incremento de identidade está integrado e testado localmente, com PostgreSQL, sessões, MFA e painéis iniciais. Casos/triagem possuem um incremento local, sem anexos e com liberação fictícia explicitamente separada de assinatura. Arquivos, gestão processual, pagamentos integrados e infraestrutura produtiva continuam pendentes. Corrigir e homologar pagamentos antes da operação comercial. DEV-059 a DEV-064 estimam 80h técnicas adicionais para integrar e operar a arquitetura e os portais separados, com reserva recalculada por fase. Segurança e testes acompanham cada tarefa; as fases finais consolidam controles e evidências.
