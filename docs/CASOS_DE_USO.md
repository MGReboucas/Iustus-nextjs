# Casos de uso

> Roteiros funcionais propostos. Referências RF correspondem ao catálogo e à matriz de rastreabilidade.

## UC-01 — Criar conta e recuperar acesso

**Atores:** visitante/cliente. **Requisitos:** RF-002 a RF-007, RF-037. **Pré-condição:** políticas publicadas e serviço de identidade disponível.

1. Pessoa informa dados, aceita versões aplicáveis e recebe instrução de verificação.
2. Token válido confirma e-mail; login cria sessão segura.
3. Logout revoga a sessão; recuperação gera token temporário e revoga sessões antigas após troca.

**Exceções:** e-mail duplicado não cria segunda conta; mensagens de recuperação não enumeram usuários; token vencido exige novo pedido; bloqueio administrativo impede sessão anterior. **Pós-condição:** identidade confirmada e auditável, sem privilégio administrativo autoconcedido.

## UC-02 — Contratar e confirmar assinatura

**Ator:** cliente verificado. **Requisitos:** RF-008 a RF-010, RF-034. **Pré-condição:** conta habilitada no provedor, cotação válida e política comercial aprovada.

1. Cliente escolhe opção permitida, servidor cria pedido com snapshot de preço e idempotência.
2. Cartão é tokenizado pelo mecanismo do provedor; dados brutos não seguem ao backend próprio.
3. Aplicação recebe resultado e exibe estado real. Evento verificado ou consulta autoritativa confirma pagamento.
4. Transação ativa a vigência e registra auditoria/outbox; cliente consulta período.

**Exceções:** timeout mantém estado indeterminado e dispara conciliação; evento repetido não duplica vigência; parcela adulterada é rejeitada; estorno/contestação segue regra aprovada. **Pós-condição:** pedido rastreado e assinatura ativa somente com evidência financeira.

## UC-03 — Abrir e avaliar caso

**Atores:** cliente, administrador e advogado. **Requisitos:** RF-011 a RF-015, RF-019/020. **Pré-condição:** cliente com vigência para submeter; categorias aprovadas.

1. Cliente salva rascunho e submete relato válido.
2. Administrador vê metadados mínimos e atribui advogado.
3. Advogado avalia e aceita, recusa com motivo publicável ou pede complemento.
4. Cliente responde; advogado resolve pendência e retoma o estado registrado.

**Exceções:** assinatura expira entre tela e envio: servidor nega submissão; versão concorrente retorna conflito; advogado transferido perde acesso; caso urgente depende de política de operação, não promessa automática. **Pós-condição:** decisão justificada e histórico consistente.

## UC-04 — Anexar e consultar documentos

**Atores:** cliente e advogado atribuído. **Requisitos:** RF-016 a RF-018. **Pré-condição:** caso e ação permitidos.

1. Iniciar upload privado com validação de tamanho e vínculo.
2. Confirmar objeto, hash e formato; manter quarentena até scanner concluir.
3. Liberar versão; consulta revalida acesso e emite URL curta.
4. Substituição cria nova versão e preserva anteriores.

**Exceções:** arquivo rejeitado não pode ser baixado; scanner indisponível não libera por padrão; upload abandonado é limpo; tentativa de outro cliente retorna 404. **Pós-condição:** documento privado, versionado e verificável.

## UC-05 — Gerar e conferir procuração

**Atores:** advogado e cliente. **Requisitos:** RF-021/022, RF-032. **Pré-condição:** modelo aprovado e dados obrigatórios completos.

1. Advogado gera PDF vinculado à versão do modelo.
2. Cliente baixa, assina externamente e envia arquivo.
3. Scanner libera o arquivo; advogado confere e aprova ou rejeita com motivo.

**Exceções:** dado faltante impede geração; arquivo ilegível ou não conforme exige novo envio; modelo alterado não modifica documento já emitido. **Pós-condição:** procuração conferida com autor, data e versão; nenhuma validação jurídica automática presumida.

## UC-06 — Preparar e entregar defesa

**Ator:** advogado atribuído. **Requisitos:** RF-027/028, RF-023 a RF-026. **Pré-condição:** caso aceito e procuração/documentos conferidos.

1. Criar minuta interna, versionar e solicitar ajustes quando necessário.
2. Revisar explicitamente uma versão; publicar somente essa versão.
3. Cliente consulta defesa; timeline e avisos mostram a entrega sem expor minutas.

**Exceções:** documento alterado após revisão exige nova revisão; falha de e-mail fica em retry e não desfaz entrega; nota interna nunca aparece ao cliente. **Pós-condição:** peça final rastreável e acessível apenas aos autorizados.

## UC-07 — Acompanhar e encerrar

**Ator:** advogado. **Requisitos:** RF-029 a RF-031, RF-039/040. **Pré-condição:** fluxo aplicável ao serviço aprovado.

1. Protocolar externamente quando necessário e registrar dados/comprovante.
2. Informar movimentações e vencimentos confirmados; sistema agenda lembretes.
3. Encerrar com motivo e preservar acesso permitido ao histórico; exportação exclui conteúdo interno para o cliente.

**Exceções:** data corrigida invalida lembrete anterior; reabertura exige motivo; assinatura vencida segue H-02; registrar protocolo não comprova integração com tribunal. **Pós-condição:** histórico de trabalho e encerramento preservados.

## UC-08 — Atender solicitação de privacidade

**Atores:** titular autenticado e operador designado. **Requisitos:** RF-035 a RF-037. **Pré-condição:** política aprovada e identidade verificada.

1. Titular registra tipo e escopo do pedido; recebe protocolo.
2. Operador verifica identidade, dados envolvidos e retenções impeditivas.
3. Executa medida autorizada, disponibiliza resposta privada e registra decisão.

**Exceções:** retenção necessária impede eliminação integral e exige justificativa; exportação vencida não fica pública; dados de terceiros são filtrados. **Pós-condição:** resposta rastreável sem prometer eliminação indiscriminada.

## UC-09 — Administrar com acesso mínimo

**Ator:** administrador com MFA. **Requisitos:** RF-006, RF-013, RF-032 a RF-035.

Convidar profissional, bloquear usuário, atribuir caso, gerir categorias/modelos e consultar financeiro. Conteúdo jurídico exige concessão temporária específica; decisão profissional exige papel de advogado e atribuição. Bloqueio revoga sessões e transferência revoga vínculo. Toda alteração privilegiada registra responsável e motivo; último administrador ativo não pode ser removido.

## UC-10 — Atuar em processo civil como autor ou réu

**Atores:** cliente e advogado atribuído. **Requisitos:** RF-027 a RF-031 e RF-041 a RF-043. **Pré-condição:** caso aceito, mandato e escopo de atuação definidos.

1. Identificar posição do cliente, partes, documentos e eventual processo já existente. No ajuizamento, número de processo pode permanecer ausente até o protocolo.
2. Definir etapas contratadas, preparar a petição inicial ou defesa pertinente e revisar a versão exata.
3. Advogado protocola no sistema oficial e registra comprovante e dados do processo na Iustus; disponibilizar a peça ao cliente não encerra a atuação.
4. Escritório acompanha intimações e publicações oficiais; advogado registra movimentações, vencimentos confirmados e audiências, com responsável e avisos.
5. Novos atos geram novas etapas/peças conforme escopo; ao final, conferir obrigações e pendências antes de encerrar.

**Exceções:** remarcação cancela lembretes obsoletos; choque de agenda exige revisão pelo responsável; data de intimação não gera cálculo jurídico automático; assinatura vencida não elimina trabalho assumido. **Pós-condição:** acompanhamento rastreável do escopo contratado, incluindo atuação ativa e defesa, sem dependência de integração automática com tribunal.
