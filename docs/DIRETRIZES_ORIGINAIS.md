# Diretrizes originais fornecidas

Registro integral das seções 27 a 39 recebidas do usuário. Numeração original preservada; seções 1 a 26 não foram fornecidas. Os documentos atuais concretizam estas diretrizes e identificam decisões pendentes. Este registro não comprova que as funcionalidades foram implementadas.

# 27. CRONOGRAMA, CARGA DE TRABALHO E PRAZO DE ENTREGA

O projeto será desenvolvido inicialmente com a seguinte capacidade:

**Equipe de desenvolvimento:** 1 programador  
**Carga diária:** 8 horas  
**Regime considerado:** desenvolvimento em tempo integral  
**Dias de desenvolvimento:** segunda a sexta-feira  
**Capacidade semanal teórica:** 40 horas

Todas as estimativas do projeto deverão considerar EXATAMENTE essa capacidade.

Não faça estimativas considerando múltiplos desenvolvedores trabalhando simultaneamente.

Quando duas funcionalidades puderem tecnicamente ser desenvolvidas em paralelo, considere que, neste projeto, elas serão executadas sequencialmente pelo mesmo desenvolvedor.

---

## 27.1 ESTIMATIVA EM HORAS

Antes de determinar datas, estime individualmente as atividades.

Utilize uma tabela semelhante a:

| ID | Fase | Atividade | Horas estimadas | Dependência | Prioridade |
|---|---|---|---:|---|---|
| DEV-001 | Fundação | Estrutura backend | 12h | - | MUST |
| DEV-002 | Autenticação | Cadastro cliente | 8h | DEV-001 | MUST |
| DEV-003 | Casos | Criação de caso | 16h | DEV-002 | MUST |

Não limite as estimativas aos exemplos acima.

Faça o levantamento completo baseado nos requisitos reais encontrados durante a documentação.

---

# 28. FASES DO DESENVOLVIMENTO

Organize o cronograma pelo menos nas seguintes fases:

### FASE 0 — Documentação e planejamento

Levantamento técnico, requisitos, arquitetura, banco, fluxos e preparação.

### FASE 1 — Fundação técnica

Estrutura do frontend, backend, banco, ambientes, configurações e infraestrutura básica.

### FASE 2 — Autenticação e usuários

Cadastro de cliente, login, recuperação, sessões, permissões e contas de advogado.

### FASE 3 — Gestão de casos

Criação, avaliação, atribuição, estados, categorias e regras do ciclo de vida.

### FASE 4 — Documentos

Upload, armazenamento, permissões, versionamento e visualização.

### FASE 5 — Dashboard do Cliente

Casos, status, pendências, documentos, atualizações e acompanhamento.

### FASE 6 — Dashboard do Advogado

Fila de trabalho, casos atribuídos, documentos, análise e gerenciamento.

### FASE 7 — Procurações

Geração, disponibilização, assinatura e armazenamento.

### FASE 8 — Timeline

Histórico completo e rastreável do caso.

### FASE 9 — Comunicação e notificações

Notificações internas, solicitações e e-mails transacionais.

### FASE 10 — Gestão jurídica

Peças, versões, protocolos, movimentações e prazos.

### FASE 11 — Administração

Gerenciamento interno necessário para operação da Iustus.

### FASE 12 — Auditoria, segurança e LGPD

Logs, permissões, proteção dos dados e requisitos de privacidade.

### FASE 13 — Testes

Testes unitários, integração, E2E e correções.

### FASE 14 — Homologação

Validação dos principais fluxos da plataforma.

### FASE 15 — Produção

Deploy, configuração, monitoramento e validação final.

---

# 29. MARGEM DE SEGURANÇA

Não considere apenas o cenário perfeito.

Depois de calcular as horas técnicas, crie também uma reserva para:

- bugs;
- refatorações;
- problemas de integração;
- alterações pequenas de requisitos;
- configuração de infraestrutura;
- testes;
- correções de segurança;
- problemas encontrados durante homologação.

Apresente separadamente:

**Horas de desenvolvimento estimadas**

**Horas de contingência**

**Total estimado**

Não esconda a contingência dentro das tarefas.

---

# 30. CÁLCULO DO PRAZO

Utilizar como base:

**1 dia útil = 8 horas**

**1 semana útil = 40 horas**

Exemplo:

Se o projeto possuir 640 horas estimadas:

640 ÷ 8 = 80 dias úteis.

Não confundir dias úteis com dias corridos.

Calcular automaticamente a data de conclusão considerando a data atual no momento em que esta documentação estiver sendo criada.

---

# 31. MARCOS DO PROJETO

Além da data final, determine marcos intermediários.

Apresente pelo menos:

**M0 — Documentação concluída**

**M1 — Fundação funcionando**

**M2 — Autenticação funcionando**

**M3 — Cliente consegue abrir um caso**

**M4 — Advogado consegue receber e trabalhar em um caso**

**M5 — Procuração funcionando**

**M6 — Acompanhamento completo funcionando**

**M7 — Fluxo jurídico completo funcionando**

**M8 — MVP Feature Complete**

**M9 — Homologação**

**M10 — Produção**

Para cada marco informar:

- funcionalidades entregues;
- horas acumuladas;
- dias úteis acumulados;
- data prevista.

---

# 32. DATA DE CONCLUSÃO DO MVP

Ao terminar o levantamento, apresentar obrigatoriamente:

## PREVISÃO DO PROJETO

**Início:** [data]

**Desenvolvedor:** 1

**Carga:** 8 horas/dia

**Carga semanal:** 40 horas

**Horas estimadas de desenvolvimento:** XXX horas

**Contingência:** XXX horas

**Total:** XXX horas

**Dias úteis:** XX

**Semanas:** XX

**MVP Feature Complete:** DD/MM/AAAA

**Homologação prevista:** DD/MM/AAAA

**Produção prevista:** DD/MM/AAAA

Não inventar esses números antes de concluir o levantamento dos requisitos.

---

# 33. ROADMAP VISUAL

Produza também um roadmap em Mermaid/Gantt dentro de:

`docs/CRONOGRAMA.md`

O gráfico deverá mostrar visualmente as fases, dependências e duração.

---

# 34. BACKLOG

Criar:

`docs/BACKLOG.md`

Transformar os requisitos em tarefas executáveis.

Cada tarefa deverá possuir:

**ID**

**Título**

**Descrição**

**Fase**

**Prioridade**

**Estimativa em horas**

**Dependências**

**Requisitos relacionados**

**Critério de conclusão**

O backlog deverá permitir que posteriormente um agente de programação execute o desenvolvimento tarefa por tarefa.

---

# 35. PLANO DE COMMITS

Criar:

`docs/PLANO_DE_COMMITS.md`

Dividir o desenvolvimento em commits pequenos e verificáveis.

Exemplo:

`feat(auth): estrutura inicial de autenticação`

`feat(auth): implementar cadastro de clientes`

`feat(auth): implementar login`

`feat(cases): criar modelo de casos`

`feat(cases): implementar abertura de caso`

`feat(documents): implementar upload de documentos`

Não criar commits gigantescos contendo diversas funcionalidades não relacionadas.

---

# 36. REGRA PARA O DESENVOLVEDOR ÚNICO

Este ponto é fundamental:

**Todo o planejamento deverá assumir UM ÚNICO PROGRAMADOR trabalhando 8 HORAS POR DIA.**

Portanto:

- não paralelizar artificialmente tarefas;
- respeitar dependências;
- não assumir equipe de QA separada;
- não assumir DevOps separado;
- não assumir designer separado;
- não assumir engenheiro de IA separado;
- considerar que configuração, testes, integração e correções também consumirão as horas desse mesmo desenvolvedor.

Caso algum trabalho dependa necessariamente de terceiro — por exemplo, advogado responsável por validar fluxo jurídico — registrar como **dependência externa**, e não como horas do programador.

---

# 37. ENTREGÁVEIS DESTA ETAPA

Ao concluir esta missão, a estrutura deverá possuir pelo menos:

`README.md`

`docs/README.md`

`docs/VISAO_GERAL.md`

`docs/MVP.md`

`docs/REQUISITOS_FUNCIONAIS.md`

`docs/REQUISITOS_NAO_FUNCIONAIS.md`

`docs/REGRAS_DE_NEGOCIO.md`

`docs/USER_STORIES.md`

`docs/CASOS_DE_USO.md`

`docs/PERMISSOES.md`

`docs/FLUXOS.md`

`docs/TELAS.md`

`docs/ARCHITECTURE.md`

`docs/DATABASE.md`

`docs/API.md`

`docs/SEGURANCA.md`

`docs/LGPD.md`

`docs/CRONOGRAMA.md`

`docs/BACKLOG.md`

`docs/PLANO_DE_COMMITS.md`

---

# 38. ATUALIZAÇÃO DO README PRINCIPAL

O `README.md` da raiz deverá deixar de ser apenas uma descrição da landing page.

Transforme-o na página inicial da documentação do projeto Iustus.

Ele deverá apresentar:

- o que é a Iustus;
- objetivo;
- estado atual;
- arquitetura resumida;
- estrutura do repositório;
- status do desenvolvimento;
- roadmap resumido;
- previsão do MVP;
- links para todos os documentos da pasta `/docs`.

Não remova informações técnicas importantes já existentes sem antes verificar sua utilidade.

---

# 39. REGRA FINAL DESTA MISSÃO

Nesta etapa:

**NÃO DESENVOLVA AS FUNCIONALIDADES DO SISTEMA.**

Primeiro:

1. analise todo o repositório;
2. identifique a stack existente;
3. documente o estado atual;
4. defina requisitos;
5. modele o sistema;
6. defina arquitetura;
7. defina banco;
8. defina fluxos;
9. defina segurança;
10. monte o backlog;
11. estime individualmente as tarefas;
12. calcule as horas;
13. converta em dias úteis considerando 8h/dia;
14. monte o cronograma;
15. determine a previsão realista de conclusão;
16. organize o plano de implementação.

Somente depois disso o projeto estará autorizado a entrar na fase de desenvolvimento.

Ao finalizar, apresente no terminal um resumo contendo:

**DOCUMENTAÇÃO IUSTUS CONCLUÍDA**

- Stack encontrada
- Quantidade de requisitos funcionais
- Quantidade de requisitos não funcionais
- Quantidade de regras de negócio
- Quantidade de user stories
- Quantidade de tarefas do backlog
- Total de horas estimadas
- Contingência
- Total geral
- Dias úteis previstos
- Data prevista do MVP
- Data prevista de homologação
- Data prevista de produção
- Próxima tarefa recomendada

Pare após concluir a documentação e aguarde autorização para iniciar o primeiro item do desenvolvimento.
