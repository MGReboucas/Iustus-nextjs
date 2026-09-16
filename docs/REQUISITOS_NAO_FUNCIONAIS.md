# Requisitos não funcionais

> Revisão 1.4 · Base: 16/09/2026 · Arquitetura aprovada; validação operacional pendente.

18 metas propostas, ainda não medidas nem certificadas. Cada requisito tem tarefa associada em [Rastreabilidade](RASTREABILIDADE.md). Desempenho, disponibilidade e recuperação dependem da infraestrutura contratada e da capacidade operacional; não são promessas comerciais.

## RNF-001 — Isolamento e autorização

Toda operação protegida verifica identidade, portal, papel e vínculo no Django; testes cruzados entre dois clientes e dois advogados devem negar 100% dos acessos indevidos, inclusive reuso de sessão em outro portal.

## RNF-002 — Proteção em trânsito e repouso

Produção usa TLS e serviços com criptografia em repouso; evidência de configuração registrada antes do lançamento.

## RNF-003 — Minimização de dados

Payload, logs, rastreamento e banco da aplicação não contêm PAN, CVV, senhas ou tokens de recuperação em claro; inspeção automatizada usa valores sintéticos.

## RNF-004 — Integridade de arquivos

Validar MIME real, tamanho de até 20 MiB e varredura; falha do scanner mantém quarentena; hash SHA-256 por versão.

## RNF-005 — Idempotência

Repetir pedido ou evento 10 vezes produz uma única cobrança lógica e uma ativação; mesma chave com corpo distinto retorna 409.

## RNF-006 — Consistência e concorrência

Estado de caso, histórico e evento de saída persistem na mesma transação; atualização com versão antiga retorna 409.

## RNF-007 — Desempenho

Meta proposta: p95 de consultas internas abaixo de 800 ms com 20 usuários simultâneos e 10000 casos sintéticos; medir separadamente serviços externos e downloads.

## RNF-008 — Acessibilidade

Fluxos essenciais navegáveis por teclado, foco visível, rótulos e erros associados; validação automática sem achados críticos e revisão manual a 200% de zoom.

## RNF-009 — Recuperação

Metas propostas: RPO de 24h e RTO de 8h; comprovar restauração de banco e arquivos em ambiente isolado antes de produção.

## RNF-010 — Disponibilidade

Meta interna proposta de 99,5% mensal, excluindo manutenção anunciada; medir checks externos a cada 5 minutos; não publicar SLA antes de validar operação.

## RNF-011 — Observabilidade

Requisições e jobs têm identificador de correlação; alertas para falhas de pagamento, scanner, fila e backup; proibir dados jurídicos em telemetria.

## RNF-012 — Tratamento de erro

Timeouts e erros externos retornam mensagem segura e requestId; usuário pode repetir operação sem duplicação.

## RNF-013 — Ambientes

Desenvolvimento, homologação e produção usam bancos, buckets e credenciais separados; homologação usa somente dados sintéticos.

## RNF-014 — Verificação contínua

Cada entrega executa lint, tipos quando aplicável, testes de regra e autorização, integração e build; falha bloqueia promoção.

## RNF-015 — Compatibilidade

Validar jornadas principais em Chrome, Edge e Firefox estáveis e Safari móvel disponível; larguras mínimas de 360 px e desktop de 1440 px.

## RNF-016 — Segredos e dependências

Segredos fora do Git; rotação documentada; varredura de dependências antes do lançamento sem achados críticos ou altos não tratados.

## RNF-017 — Retenção verificável

Política aprovada por classe de dado, bloqueio de eliminação por retenção justificada e registro de execução; expiração de backups e exportações definida.

## RNF-018 — Tarefas assíncronas

Worker com tentativas limitadas, backoff e fila de falhas; reprocessamento auditado não duplica efeitos; jobs não dependem de requisição aberta.
