# IUSTUS — Defesa Jurídica Online

Plataforma por assinatura para solicitar, acompanhar e receber defesas jurídicas online. A jornada pretendida reúne contratação, envio de casos e documentos, procuração, acompanhamento pelo cliente e preparação da defesa por advogado designado.

**Estado em 16/09/2026:** repositório organizado em frontend, backend, infraestrutura e documentação. Landing, checkout PagBank parcial e acesso demonstrativo foram preservados. A base Django inclui usuário customizado, migração inicial e endpoint de saúde; autenticação dos portais, banco PostgreSQL em operação, dashboards, worker e gestão jurídica ainda serão desenvolvidos. Regras operacionais, fornecedores e calendário permanecem pendentes.

[Documentação completa](docs/README.md) · [Estado atual](docs/ESTADO_ATUAL.md) · [MVP](docs/MVP.md) · [Backlog](docs/BACKLOG.md) · [Cronograma](docs/CRONOGRAMA.md)

## Objetivo e proposta comercial

**Operação confirmada:** escritório próprio no Rio Grande do Norte, com dois advogados inicialmente, para multas de trânsito e direito civil em geral, **excluindo apenas família e sucessões do escopo civil**. No civil, a atuação é completa: ajuizar, defender, protocolar e acompanhar; consumo, imobiliário e demais matérias civis permanecem incluídos. Checklists, abrangência territorial e fases incluídas no preço estão em detalhamento nas [Regras do serviço](docs/REGRAS_DO_SERVICO.md). Essa equipe jurídica é distinta do desenvolvedor único considerado no cronograma.

Permitir que o cliente com assinatura confirmada envie um caso, forneça documentos e procuração e acompanhe o trabalho do escritório, incluindo ajuizamento, defesa, protocolos e andamento civil, com acesso restrito e histórico rastreável.

A oferta existente é de **R$ 547 por ano**, com uso ilimitado durante a vigência e anúncio de pagamento à vista ou em **6 ou 12 vezes**. Categorias atendidas, condições do serviço, política de renovação e tratamento de casos após expiração ainda dependem de validação. O formulário atual oferece opções até 12 parcelas retornadas pelo provedor; a divergência com a comunicação será resolvida no backlog.

A landing apresenta proposta de valor, jornada em três etapas, benefícios, plano anual, FAQ, layout responsivo e identidade azul-marinho/dourado. O painel ilustrado é uma prévia; os depoimentos são modelos que precisam ser substituídos por relatos reais autorizados ou retirados antes da publicação.

## Estado do desenvolvimento

| Componente | Situação |
| --- | --- |
| Landing page e identidade visual | Código existente; revisão final de conteúdo/acessibilidade pendente |
| Checkout PagBank | SDK e rotas existentes; correções de segurança, conciliação e homologação pendentes |
| Login e cadastro | Interface demonstrativa; sem autenticação persistente |
| Fundação técnica | Frontend com TypeScript incremental; Django/DRF com usuário UUID, migração inicial, liveness e testes locais |
| Assinatura, casos e documentos | Planejados; sem módulos persistentes implementados |
| Dashboards e gestão jurídica | Planejados |
| Documentação do MVP | Revisão 1.3; estrutura criada e validação operacional pendente |
| Produção | Nenhuma evidência de homologação ou implantação verificada nesta etapa |

O levantamento identificou envio desnecessário de campos de cartão ao backend e exibição de aprovação sem confirmação de estado financeiro. Correções estão priorizadas em [Estado atual](docs/ESTADO_ATUAL.md) e [Segurança](docs/SEGURANCA.md). A existência do checkout não significa que esteja pronto para cobrança real.

## Arquitetura resumida

**Atual:** aplicação Next.js 15.3.2 / React 19.1.0 preservada em `frontend/`, com JavaScript/CSS existentes e TypeScript configurado para adoção incremental. Em `backend/`, Django 5.2.17 e DRF 3.18.1 têm configuração local, modelo de usuário e uma API de saúde. As rotas PagBank ainda estão no Next.js; a base Django não implementa os fluxos de acesso e pagamento do produto.

**Arquitetura aprovada:** Next.js + TypeScript no frontend; Python + Django + Django REST Framework no backend; PostgreSQL com Django ORM; armazenamento privado de objetos e worker Python separado com outbox transacional. Um repositório, com backend modular responsável por identidade, autorização, regras jurídicas e pagamentos. Fornecedores, versões, região e custos ainda serão validados. [Arquitetura e diagramas](docs/ARCHITECTURE.md) · [Modelo de dados](docs/DATABASE.md) · [API](docs/API.md).

**Portais aprovados:** área do cliente e portal profissional em subdomínios separados, com sessões vinculadas ao respectivo portal e MFA obrigatório para a equipe. Uma entrada HTTPS encaminhará `/api/v1` ao Django no mesmo domínio de cada portal. A base de código foi criada; subdomínios, integração e isolamento de sessões continuam pendentes.

## Roadmap resumido

1. Validar documentação, escopo, calendário e dependências externas.
2. Preparar fundação técnica, identidade, pagamentos e vigência.
3. Implementar casos, documentos, dashboards e procurações.
4. Implementar histórico, comunicação, peças, registros externos e administração.
5. Consolidar segurança, privacidade, regressão e homologação.
6. Preparar produção, restauração, monitoramento e operação assistida.

Uma pessoa executará as tarefas sequencialmente, incluindo infraestrutura, testes e correções. A fase 2A explicita pagamentos e assinatura. O MVP prevê assinatura de procuração externa e protocolo registrado manualmente pelo advogado; integrações com tribunais e assinatura embutida ficam fora da primeira versão, conforme hipótese registrada em [Decisões](docs/DECISOES.md).

## Previsão do MVP

<!-- PLANEJAMENTO:INICIO -->

**Início de referência:** 16/09/2026

**Desenvolvedor:** 1 · **Carga:** 8h/dia · **Carga semanal:** 40h

**Horas técnicas planejadas:** 1360h

**Contingência:** 336h (24,71% efetivos)

**Total:** 1696h · **Dias de capacidade:** 212 · **Semanas de capacidade:** 42,4

**MVP Feature Complete:** 12/05/2027

**Homologação concluída:** 24/06/2027

**Produção validada:** 08/07/2027

Calendário provisório de segunda a sexta-feira; feriados, férias e ausências ainda não descontados. As datas dependem da confirmação do calendário e das dependências externas. Detalhamento, reservas e dependências: [Cronograma](docs/CRONOGRAMA.md).

<!-- PLANEJAMENTO:FIM -->

## Executar localmente

Frontend verificado com Node.js 24.14.1; dependências travadas em `frontend/package-lock.json`. Na raiz:

```bash
npm run frontend:install
npm run dev
```

`frontend:install` executa `npm ci` dentro de `frontend/`; os scripts da raiz encaminham os comandos para essa pasta. Em PowerShell com restrição a scripts, use `npm.cmd` no lugar de `npm`. Abra [localhost:3000](http://localhost:3000). Executar apenas `npm ci` na raiz não instala o frontend.

Build e execução de produção local:

```bash
npm run build
npm start
```

Use `npm run typecheck` para verificar TypeScript. O backend tem instalação e comandos próprios em [backend/README.md](backend/README.md); o PostgreSQL local opcional está em [infra/README.md](infra/README.md). Instruções do frontend: [frontend/README.md](frontend/README.md). Passar no build não comprova autenticação, segurança financeira ou homologação.

## Configuração PagBank

A rota `/checkout` usa layout próprio e o SDK de Checkout Transparente presente no código. A biblioteca cria sessão, identifica bandeira, consulta parcelas e tokeniza o cartão. Parcelas, juros e total dependem da conta e do provedor; não devem ser fixados arbitrariamente no frontend. O backend ainda precisa validar a cotação e o estado financeiro.

Copie `frontend/.env.example` para `frontend/.env.local` e preencha as credenciais da conta de teste:

```dotenv
PAGBANK_EMAIL=seu-email-de-vendedor
PAGBANK_TOKEN=seu-token-de-integracao
NEXT_PUBLIC_PAGBANK_SANDBOX=true
```

`PAGBANK_EMAIL` e `PAGBANK_TOKEN` são privados e usados exclusivamente no servidor. Não versionar valores. `NEXT_PUBLIC_PAGBANK_SANDBOX` é público e afeta o build; definir `false` somente após correções, testes, homologação e configuração produtiva coerente. O produto/API habilitado precisa ser confirmado antes de consolidar a integração. [Contratos](docs/API.md) · [Operação](docs/OPERACAO.md).

## Estrutura do repositório

```text
frontend/
├── app/                              # Páginas, CSS e rotas PagBank preservados
├── src/lib/api/                      # Base para integração HTTP TypeScript
├── index.html                        # Referência estática preservada
├── .env.example                      # Configuração do frontend/checkout legado
├── tsconfig.json
└── package.json / package-lock.json   # Dependências do frontend
backend/
├── manage.py
├── config/                           # URLs, ASGI/WSGI e settings local/test
├── apps/                             # Identity, billing, cases, documents, legal...
├── integrations/                     # PagBank, objetos, e-mail e scanner
├── jobs/                             # Estrutura reservada ao worker
├── tests/                            # Testes da fundação
├── .env.example
└── pyproject.toml / requirements.lock
infra/
├── compose.local.yaml                # PostgreSQL local opcional
├── proxy/                            # Diretrizes da entrada HTTPS
└── deploy/                           # Diretrizes de implantação
tests/e2e/                            # Estrutura para jornadas futuras
docs/                                 # Documentação e gerador de planejamento
package.json / package-lock.json       # Atalhos da raiz, sem dependências de runtime
.git/                                 # Repositório e histórico originais preservados
README.md
```

## Documentação

| Tema | Documentos |
| --- | --- |
| Produto | [Visão geral](docs/VISAO_GERAL.md), [Estado atual](docs/ESTADO_ATUAL.md), [MVP](docs/MVP.md), [Resumo executivo](docs/RESUMO_EXECUTIVO.md) |
| Especificação | [Requisitos funcionais](docs/REQUISITOS_FUNCIONAIS.md), [Não funcionais](docs/REQUISITOS_NAO_FUNCIONAIS.md), [Regras de negócio](docs/REGRAS_DE_NEGOCIO.md), [User stories](docs/USER_STORIES.md), [Casos de uso](docs/CASOS_DE_USO.md) |
| Experiência e acesso | [Permissões](docs/PERMISSOES.md), [Fluxos](docs/FLUXOS.md), [Telas](docs/TELAS.md) |
| Engenharia | [Arquitetura](docs/ARCHITECTURE.md), [Banco](docs/DATABASE.md), [API](docs/API.md), [Segurança](docs/SEGURANCA.md), [LGPD](docs/LGPD.md) |
| Execução | [Cronograma](docs/CRONOGRAMA.md), [Backlog](docs/BACKLOG.md), [Plano de commits](docs/PLANO_DE_COMMITS.md), [Rastreabilidade](docs/RASTREABILIDADE.md) |
| Qualidade e operação | [Testes](docs/TESTES.md), [Operação](docs/OPERACAO.md), [Riscos](docs/RISCOS.md), [Verificação documental](docs/VERIFICACAO.md) |
| Governança | [Índice](docs/README.md), [Decisões](docs/DECISOES.md), [Fontes](docs/FONTES.md), [Diretrizes originais](docs/DIRETRIZES_ORIGINAIS.md) |

Para recalcular o planejamento e conferir a documentação:

```bash
node docs/planejamento/gerar.cjs
node docs/planejamento/gerar.cjs --check
node docs/planejamento/verificar.cjs
```

A fonte única de requisitos e estimativas está em [dados.cjs](docs/planejamento/dados.cjs). As diretrizes originais das seções 27–39 foram preservadas integralmente no documento vinculado acima; as seções 1–26 não foram fornecidas.

## Próximo passo e limite desta etapa

Conferir o inventário e validar regras, fornecedores e calendário (DEV-001 a DEV-003), avançando na fundação técnica. A organização do repositório e o scaffold local foram autorizados e executados; isso não conclui DEV-004/005/059 nem os fluxos do produto. As estimativas representam a baseline integral, ainda não um saldo de horas restantes. O worker, os portais e a migração financeira continuam no backlog.

A comunicação jurídica, critérios de atendimento, modelos, condições comerciais, retenção de dados e fluxos de contratação devem ser revisados pelos responsáveis da operação antes da publicação.
