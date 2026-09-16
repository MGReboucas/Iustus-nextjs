# Plano de commits

> Revisão 1.5 · Base: 16/09/2026 · Arquitetura aprovada; validação operacional pendente.

Cada tarefa pode exigir mais de um commit. Os títulos abaixo definem a unidade de entrega; separar migração, domínio e interface quando cada parte puder ser verificada independentemente. Nunca juntar tarefas não relacionadas nem deixar migração incompatível com o código da mesma entrega.

Antes de cada commit: revisar diff, remover segredos/dados reais, executar verificações pertinentes e atualizar evidência do aceite. Não criar commits nesta etapa automaticamente.

| Tarefa | Título proposto | Verificação |
| --- | --- | --- |
| DEV-001 | docs(planning): conferir inventário e riscos do código | Critério de DEV-001 e Definition of Done |
| DEV-002 | docs(planning): validar escopo e regras com responsáveis | Critério de DEV-002 e Definition of Done |
| DEV-003 | docs(planning): revisar arquitetura, contratos e planejamento | Critério de DEV-003 e Definition of Done |
| DEV-004 | feat(foundation): preparar estrutura, configuração e verificação contínua | Critério de DEV-004 e Definition of Done |
| DEV-059 | feat(foundation): preparar backend Django e contrato DRF | Critério de DEV-059 e Definition of Done |
| DEV-005 | feat(foundation): criar esquema inicial e migrações Django | Critério de DEV-005 e Definition of Done |
| DEV-006 | feat(foundation): configurar ambientes e armazenamento privado | Critério de DEV-006 e Definition of Done |
| DEV-060 | feat(foundation): configurar entrada HTTPS e API por portal | Critério de DEV-060 e Definition of Done |
| DEV-007 | feat(foundation): criar camada de domínio, erros e autorização | Critério de DEV-007 e Definition of Done |
| DEV-008 | feat(auth): implementar cadastro e verificação de e-mail | Critério de DEV-008 e Definition of Done |
| DEV-009 | feat(auth): implementar login, logout e sessões Django | Critério de DEV-009 e Definition of Done |
| DEV-061 | feat(auth): integrar frontend e sessões isoladas por portal | Critério de DEV-061 e Definition of Done |
| DEV-010 | feat(auth): implementar recuperação e alteração de perfil | Critério de DEV-010 e Definition of Done |
| DEV-011 | feat(auth): implementar convites, papéis e MFA da equipe | Critério de DEV-011 e Definition of Done |
| DEV-012 | feat(billing): validar produto PagBank e contrato de integração | Critério de DEV-012 e Definition of Done |
| DEV-013 | feat(billing): corrigir payload e validação financeira do checkout | Critério de DEV-013 e Definition of Done |
| DEV-062 | feat(billing): migrar checkout para API Django e retirar rotas legadas | Critério de DEV-062 e Definition of Done |
| DEV-014 | feat(billing): persistir pedidos e idempotência de cobrança | Critério de DEV-014 e Definition of Done |
| DEV-015 | feat(billing): implementar notificações e conciliação financeira | Critério de DEV-015 e Definition of Done |
| DEV-016 | feat(billing): implementar vigência e estados da assinatura | Critério de DEV-016 e Definition of Done |
| DEV-017 | feat(cases): implementar rascunho e submissão de caso | Critério de DEV-017 e Definition of Done |
| DEV-055 | feat(cases): cadastrar processos, partes e posição do cliente | Critério de DEV-055 e Definition of Done |
| DEV-018 | feat(cases): implementar triagem e atribuição | Critério de DEV-018 e Definition of Done |
| DEV-019 | feat(cases): implementar máquina de estados e concorrência | Critério de DEV-019 e Definition of Done |
| DEV-020 | feat(cases): implementar pendências de documentos e informações | Critério de DEV-020 e Definition of Done |
| DEV-021 | feat(documents): implementar upload privado e metadados | Critério de DEV-021 e Definition of Done |
| DEV-022 | feat(documents): implementar quarentena e verificação de arquivo | Critério de DEV-022 e Definition of Done |
| DEV-023 | feat(documents): implementar versões e download autorizado | Critério de DEV-023 e Definition of Done |
| DEV-024 | feat(client): construir painel e busca do cliente | Critério de DEV-024 e Definition of Done |
| DEV-025 | feat(client): construir detalhe e resposta a pendências | Critério de DEV-025 e Definition of Done |
| DEV-026 | feat(lawyer): construir fila e filtros do advogado | Critério de DEV-026 e Definition of Done |
| DEV-027 | feat(lawyer): construir área de trabalho e triagem | Critério de DEV-027 e Definition of Done |
| DEV-028 | feat(mandates): implementar modelo versionado e geração de procuração | Critério de DEV-028 e Definition of Done |
| DEV-029 | feat(mandates): implementar devolução assinada e conferência | Critério de DEV-029 e Definition of Done |
| DEV-030 | feat(timeline): publicar timeline a partir dos eventos persistidos | Critério de DEV-030 e Definition of Done |
| DEV-031 | feat(notifications): implementar mensagens e notas internas | Critério de DEV-031 e Definition of Done |
| DEV-032 | feat(notifications): consolidar outbox e implementar notificações internas | Critério de DEV-032 e Definition of Done |
| DEV-033 | feat(notifications): implementar e-mails e modelos transacionais | Critério de DEV-033 e Definition of Done |
| DEV-034 | feat(legal): implementar peças e revisão para publicação | Critério de DEV-034 e Definition of Done |
| DEV-035 | feat(legal): implementar registro de protocolo e movimentações | Critério de DEV-035 e Definition of Done |
| DEV-036 | feat(legal): implementar prazos e lembretes | Critério de DEV-036 e Definition of Done |
| DEV-056 | feat(legal): implementar agenda de audiências e remarcações | Critério de DEV-056 e Definition of Done |
| DEV-057 | feat(legal): implementar etapas contratadas e ciclo judicial | Critério de DEV-057 e Definition of Done |
| DEV-037 | feat(legal): implementar encerramento e exportação do caso | Critério de DEV-037 e Definition of Done |
| DEV-038 | feat(admin): construir gestão de usuários e atribuições | Critério de DEV-038 e Definition of Done |
| DEV-039 | feat(admin): construir gestão de categorias e modelos | Critério de DEV-039 e Definition of Done |
| DEV-040 | feat(admin): construir consulta financeira e intervenção controlada | Critério de DEV-040 e Definition of Done |
| DEV-041 | feat(security): consolidar auditoria e revisão de acesso | Critério de DEV-041 e Definition of Done |
| DEV-042 | feat(security): implementar solicitações de privacidade e retenção | Critério de DEV-042 e Definition of Done |
| DEV-043 | feat(security): publicar políticas e revisar comunicação institucional | Critério de DEV-043 e Definition of Done |
| DEV-044 | feat(security): revisar segurança, segredos e minimização | Critério de DEV-044 e Definition of Done |
| DEV-045 | test(quality): executar regressão de regras e isolamento | Critério de DEV-045 e Definition of Done |
| DEV-063 | test(quality): testar fronteiras Next.js, Django e portais | Critério de DEV-063 e Definition of Done |
| DEV-046 | test(quality): executar jornada E2E e testes de falhas externas | Critério de DEV-046 e Definition of Done |
| DEV-058 | test(quality): validar jornadas judiciais como autor e réu | Critério de DEV-058 e Definition of Done |
| DEV-047 | test(quality): verificar desempenho, acessibilidade e navegadores | Critério de DEV-047 e Definition of Done |
| DEV-048 | test(quality): ensaiar restauração e resposta a incidente | Critério de DEV-048 e Definition of Done |
| DEV-049 | test(acceptance): preparar roteiro e massa para homologação | Critério de DEV-049 e Definition of Done |
| DEV-050 | test(acceptance): acompanhar homologação funcional e operacional | Critério de DEV-050 e Definition of Done |
| DEV-051 | test(acceptance): corrigir itens de aceite e fechar homologação | Critério de DEV-051 e Definition of Done |
| DEV-052 | chore(release): preparar produção, alertas e backups | Critério de DEV-052 e Definition of Done |
| DEV-064 | chore(release): validar implantação coordenada de frontend, API e worker | Critério de DEV-064 e Definition of Done |
| DEV-053 | chore(release): executar implantação controlada e reversão ensaiada | Critério de DEV-053 e Definition of Done |
| DEV-054 | chore(release): validar operação assistida e entregar runbook | Critério de DEV-054 e Definition of Done |
