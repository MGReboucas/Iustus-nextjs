# Resumo executivo do planejamento

> Revisão 1.3 · Base: 16/09/2026 · Arquitetura aprovada; validação operacional pendente.

**Situação:** repositório organizado em frontend/backend/infra/docs e fundação local criada. Baseline e hipóteses operacionais aguardam validação. Scaffold não equivale ao aceite das tarefas do MVP; as horas abaixo representam a estimativa integral, não o saldo restante.

Stack atual: Next.js 15.3.2, React 19.1.0, JavaScript/CSS preservados e TypeScript incremental em frontend/. Django 5.2.17 e DRF 3.18.1 em backend/, com usuário customizado, migração inicial e liveness. PostgreSQL em operação, autenticação dos portais e worker funcional continuam pendentes; PagBank permanece no legado Next.js.

Arquitetura aprovada: Next.js + TypeScript no frontend, Python + Django REST Framework no backend, PostgreSQL e worker Python separado. DEV-059 a DEV-064 acrescentam 80h técnicas para integração, isolamento dos portais e operação; reserva recalculada por fase. A organização inicial implementa parte da fundação; integração dos portais, contrato OpenAPI e operação produtiva ainda não foram concluídos.

- Requisitos funcionais: 43.
- Requisitos não funcionais: 18.
- Regras de negócio: 25.
- User stories: 43.
- Tarefas do backlog: 64.

**Início de referência:** 16/09/2026

**Desenvolvedor:** 1 · **Carga:** 8h/dia · **Carga semanal:** 40h

**Horas técnicas planejadas:** 1360h

**Contingência:** 336h (24,71% efetivos)

**Total:** 1696h · **Dias de capacidade:** 212 · **Semanas de capacidade:** 42,4

**MVP Feature Complete:** 12/05/2027

**Homologação concluída:** 24/06/2027

**Produção validada:** 08/07/2027

Calendário provisório de segunda a sexta-feira; feriados, férias e ausências ainda não descontados. As datas dependem da confirmação do calendário e das dependências externas.

**Próxima tarefa recomendada:** revisar inventário e riscos em DEV-001 e validar hipóteses, fornecedores e calendário em DEV-002. Organização e scaffold foram autorizados; os demais critérios de DEV-004/005/059 e as dependências bloqueantes permanecem em aberto. Nenhuma tarefa integral foi marcada como aceita apenas pela criação de pastas.
