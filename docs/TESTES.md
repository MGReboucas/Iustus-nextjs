# Estratégia de testes e homologação

> Plano de validação do produto futuro. A organização inicial verificou build/TypeScript e seis testes da fundação Django; os cenários de negócio abaixo ainda não foram executados.

## Camadas

| Camada | Conteúdo | Quando |
| --- | --- | --- |
| Regra/unidade | Transições, vigência, parcelas permitidas, visibilidade e payloads | Na tarefa de implementação |
| Integração | Banco, constraints, autorização por recurso, outbox, idempotência e armazenamento | Na entrega de cada módulo |
| Contrato externo | PagBank habilitado, e-mail, scanner e objetos; fixtures e sandbox | Ao integrar fornecedor e antes de homologar |
| E2E | Jornadas por papel, contratação até entrega e falhas recuperáveis | Durante módulos e regressão final |
| Não funcional | Acessibilidade, carga, recuperação, redaction e concorrência | Durante módulos e fase 13 |
| Aceite humano | Adequação do fluxo jurídico, textos, modelos e operação | Fase 14, com responsáveis designados |

A base inclui testes Python/Django, configuração TypeScript e comandos de build e verificação documental. Em backend/, executar `manage.py test --settings=config.settings.test` pelo Python da venv. Os seis testes atuais cobrem liveness, método indevido, ausência de login/admin, host não permitido, normalização/hash de usuário e unicidade de e-mail. SQLite em memória serve apenas à fundação; PostgreSQL isolado, testes de contratos, automação E2E e OpenAPI continuam pendentes em DEV-004/059 e demais tarefas.

## Cenários críticos de aceitação

| ID | Cenário e resultado exigido | Requisitos principais |
| --- | --- | --- |
| T-01 | Cadastro duplicado, token vencido e recuperação não enumeram conta; logout e bloqueio invalidam sessão | RF-002–005 |
| T-02 | Cliente A troca IDs por dados do cliente B em API, upload e exportação; todos negados | RNF-001; RF-016/018/040 |
| T-03 | Advogado transferido perde leitura/edição; admin sem concessão só vê metadados | RF-013; RN-008/009 |
| T-04 | Inspeção de requisição/log com cartão sintético comprova ausência de PAN, CVV e validade no backend próprio | RF-008; RNF-003 |
| T-05 | Parcela, total e plano adulterados não mudam pedido; idempotência repetida mantém uma cobrança lógica | RF-008; RN-023; RNF-005 |
| T-06 | Código sem estado confirmado não ativa; evento duplicado e fora de ordem não duplica vigência | RF-009/010; RN-024 |
| T-07 | Timeout após envio mantém UNKNOWN até consulta; refresh/novo clique não cobra novamente | RF-008/009; RNF-012 |
| T-08 | Vigência no limite, ano bissexto e renovação seguem H-01; expiração não apaga casos | RF-010; RN-004/006 |
| T-09 | Submissão sem vigência é negada; rascunho permitido; concorrência retorna 409 sem histórico parcial | RF-011/014; RNF-006 |
| T-10 | Arquivo maior, MIME falso, malicioso ou scanner indisponível não é liberado; versão anterior íntegra | RF-016/017; RNF-004 |
| T-11 | Procuração com dado incompleto não gera; envio não aprova sozinho; rejeição aceita nova versão | RF-021/022 |
| T-12 | Minuta e nota interna não vazam em UI, API, timeline, e-mail ou exportação | RF-023/026/027/040; RN-017 |
| T-13 | Publicação só aceita versão revisada; alteração invalida revisão anterior | RF-028; RN-014 |
| T-14 | Protocolo exige comprovante; prazo manual alterado invalida lembrete obsoleto | RF-029/031 |
| T-15 | Falha do e-mail preserva mudança de caso; retry e replay de worker não duplicam efeito | RF-024/025; RNF-018 |
| T-16 | Solicitação de titular verifica identidade, protege terceiros e registra retenção impeditiva | RF-036; RNF-017 |
| T-17 | Restauração de banco e objetos atinge RPO/RTO propostos e reaplica restrições de dados | RNF-009/017 |
| T-18 | Jornada por teclado, zoom 200%, 360 px e navegadores definidos sem bloqueios | RNF-008/015 |
| T-19 | Consultas p95 menor que 800 ms no cenário de 20 usuários/10000 casos; separar latência externa | RNF-007 |
| T-20 | Último administrador não é removido; MFA e convite impedem autoelevação | RF-006/033; RN-022 |
| T-21 | Cliente autor inicia sem número e recebe vínculo após ajuizamento; cliente réu informa processo existente; partes de caso alheio não são consultáveis | RF-041 |
| T-22 | Remarcação de audiência preserva histórico, alerta choque e invalida lembretes antigos; link não aparece para terceiro | RF-042 |
| T-23 | Publicação de peça não encerra acompanhamento; ato posterior reabre preparação; prazo/audiência pendente impede fechamento | RF-043; RF-028/039 |
| T-24 | Família e sucessões ficam fora do escopo civil; consumo, imobiliário e outra matéria civil não listada nos exemplos continuam elegíveis à triagem; demanda mista exige classificação profissional | RN-025; RF-012/032 |
| T-25 | Login sem CSRF, cookie copiado entre portais, host encaminhado forjado e desafio MFA pendente não liberam APIs; respostas privadas não aparecem em cache de outro usuário | RNF-001/002/013 |
| T-26 | Listagem e criação DRF respeitam vínculo; Django Admin não contorna serviços; frontend distingue AUTH_REQUIRED/FORBIDDEN/CSRF_FAILED; endpoint financeiro legado deixa de executar cobrança | RNF-001/003/014; RF-008 |

Os demais critérios dos catálogos são obrigatórios mesmo quando não repetidos nesta tabela. T-01 a T-26 priorizam risco; não substituem cobertura integral de [Rastreabilidade](RASTREABILIDADE.md).

## Massa e ambiente

Dois clientes, dois advogados e administradores para testar concessões; planos, pedidos e casos em todos os estados. Usar apenas documentos e dados sintéticos, cartões de teste fornecidos pelo ambiente homologado e credenciais exclusivas. Simular serviço lento, indisponível, resposta inválida, evento repetido, evento fora de ordem e falha entre transação e envio externo.

## Evidência e critérios de saída

Registrar cenário, build/commit, ambiente, data, executor, esperado, observado e referência da evidência sem dado sensível. Estado inicial de todos os testes: **não executado**. Falhas de autorização, cobrança, exposição, perda de dados ou recuperação são bloqueadoras. Cobertura percentual isolada não comprova qualidade: todos os cenários críticos devem passar.

Homologação: preparar massa e roteiro → executar como cliente → executar como advogado → executar como administrador → verificar jornada financeira e exceções → revisar modelos/textos → registrar defeitos → corrigir → repetir cenários afetados → obter aceite nominal. Aceite jurídico e operacional são dependências externas, sem horas de terceiro embutidas nas estimativas do desenvolvedor.

## Distribuição de esforço

Backlog inclui testes locais e revisão em cada tarefa. Fase 13 trata integração transversal, carga, acessibilidade, recuperação e regressão; fase 14 trata execução do aceite e correções esperadas. A reserva é apenas para desvios imprevistos; não contar novamente o mesmo teste como contingência.
