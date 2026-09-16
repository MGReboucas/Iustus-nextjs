# User stories

> Revisão 1.5 · Base: 16/09/2026 · Arquitetura aprovada; validação operacional pendente.

43 histórias correspondentes aos requisitos funcionais. Cada história herda a prioridade MUST do requisito e possui aceite observável. Para fluxos combinados, consultar [Casos de uso](CASOS_DE_USO.md).

## US-001 — Apresentação pública

Como **visitante**, preciso **conhecer plano, limites do serviço e canais de acesso**, para **decidir sobre a contratação com informações coerentes**.

**Aceite:** Preço, condições e links de termos coincidem com a política aprovada; nenhum depoimento fictício aparece como real.

**Requisito:** RF-001. **Tarefas:** DEV-043.

## US-002 — Cadastro de cliente

Como **cliente**, preciso **criar conta com e-mail verificado e aceite versionado**, para **ter uma identidade verificada para acessar os serviços**.

**Aceite:** E-mail duplicado não cria outra conta; token expirado não verifica cadastro.

**Requisito:** RF-002. **Tarefas:** DEV-008.

## US-003 — Login e logout

Como **usuário**, preciso **autenticar e encerrar a própria sessão**, para **acessar minha área com segurança e encerrar o acesso quando necessário**.

**Aceite:** Credenciais válidas abrem sessão; logout impede reutilização; falhas não revelam existência da conta.

**Requisito:** RF-003. **Tarefas:** DEV-009, DEV-061.

## US-004 — Recuperação de acesso

Como **usuário**, preciso **recuperar senha por token temporário de uso único**, para **retomar o acesso sem expor minha conta**.

**Aceite:** Token usado ou expirado é rejeitado; alteração revoga sessões anteriores.

**Requisito:** RF-004. **Tarefas:** DEV-010.

## US-005 — Controle de sessões

Como **administrador**, preciso **bloquear conta e revogar sessões**, para **interromper acessos indevidos após bloqueio ou comprometimento**.

**Aceite:** Conta bloqueada perde acesso em nova requisição protegida, inclusive com cookie anterior.

**Requisito:** RF-005. **Tarefas:** DEV-009, DEV-061.

## US-006 — Convite de advogado

Como **administrador**, preciso **convidar advogado com perfil aprovado pela operação**, para **permitir atuação apenas de profissionais autorizados pela operação**.

**Aceite:** Convite expira; cliente não consegue atribuir a si próprio papel de advogado.

**Requisito:** RF-006. **Tarefas:** DEV-011.

## US-007 — Perfil do cliente

Como **cliente**, preciso **consultar e corrigir os próprios dados cadastrais**, para **manter dados corretos para comunicação e atendimento**.

**Aceite:** Atualização valida campos, exige revalidação de e-mail e não permite alterar papel ou assinatura.

**Requisito:** RF-007. **Tarefas:** DEV-005, DEV-010.

## US-008 — Checkout seguro

Como **cliente**, preciso **contratar o plano com preço e parcelas confirmados pelo servidor**, para **contratar pelo valor confirmado sem expor dados do cartão à aplicação**.

**Aceite:** Payload interno não contém PAN, CVV ou validade; parcela adulterada é rejeitada; pedido pertence ao cliente autenticado.

**Requisito:** RF-008. **Tarefas:** DEV-001, DEV-012, DEV-013, DEV-062, DEV-014, DEV-046.

## US-009 — Conciliação de pagamento

Como **sistema**, preciso **confirmar estados de pagamento por comunicação verificada com o provedor**, para **liberar atendimento apenas quando a contratação estiver confirmada**.

**Aceite:** Evento repetido não duplica ativação; código de transação sem confirmação não libera acesso.

**Requisito:** RF-009. **Tarefas:** DEV-001, DEV-012, DEV-062, DEV-015, DEV-046.

## US-010 — Vigência da assinatura

Como **cliente**, preciso **consultar situação, início e fim do período contratado**, para **entender quando posso submeter novos casos**.

**Aceite:** Vigência é persistida; expiração bloqueia novas submissões; histórico continua acessível conforme política aprovada.

**Requisito:** RF-010. **Tarefas:** DEV-002, DEV-005, DEV-016, DEV-040, DEV-050.

## US-011 — Abertura de caso

Como **cliente**, preciso **salvar rascunho e submeter relato, categoria e documentos**, para **iniciar atendimento com informações suficientes e sem duplicidade**.

**Aceite:** Rascunho pode ser incompleto; submissão valida campos e vigência no servidor; reenvio não duplica caso.

**Requisito:** RF-011. **Tarefas:** DEV-005, DEV-017, DEV-025.

## US-012 — Triagem de caso

Como **advogado**, preciso **avaliar elegibilidade e suficiência das informações**, para **identificar se o caso pode ser atendido e o que precisa ser complementado**.

**Aceite:** Somente profissional designado registra aceite, recusa justificada ou pendência; família e sucessões ficam fora do escopo civil conforme RN-025, demais matérias civis não são recusadas só por não constarem dos exemplos; cliente visualiza motivo publicável.

**Requisito:** RF-012. **Tarefas:** DEV-002, DEV-018, DEV-027, DEV-049.

## US-013 — Atribuição de caso

Como **administrador**, preciso **designar e substituir o advogado responsável**, para **manter responsabilidade clara por cada atendimento**.

**Aceite:** Há um responsável ativo; troca registra motivo e revoga acesso do anterior.

**Requisito:** RF-013. **Tarefas:** DEV-018, DEV-038.

## US-014 — Estados do caso

Como **advogado**, preciso **atualizar o andamento pelas transições permitidas**, para **acompanhar uma sequência de trabalho consistente e auditável**.

**Aceite:** Transição inválida ou concorrente retorna conflito sem alterar histórico.

**Requisito:** RF-014. **Tarefas:** DEV-019, DEV-027.

## US-015 — Solicitação de complemento

Como **advogado**, preciso **solicitar documentos ou esclarecimentos ao cliente**, para **resolver impedimentos sem perder o vínculo com o pedido original**.

**Aceite:** Solicitação tem descrição, autor e estado; resposta mantém vínculo ao caso e permite resolução explícita.

**Requisito:** RF-015. **Tarefas:** DEV-020, DEV-025.

## US-016 — Upload privado

Como **cliente**, preciso **anexar arquivos permitidos ao próprio caso**, para **entregar evidências com acesso controlado**.

**Aceite:** Arquivo acima de 20 MiB ou tipo incompatível é recusado; arquivo fica em quarentena até verificação.

**Requisito:** RF-016. **Tarefas:** DEV-021, DEV-022.

## US-017 — Versões de documentos

Como **usuário autorizado**, preciso **substituir documento sem apagar versões anteriores**, para **corrigir arquivos preservando o histórico de versões**.

**Aceite:** Nova versão preserva hash, autor e referência anterior; download de versão antiga segue a mesma autorização.

**Requisito:** RF-017. **Tarefas:** DEV-023.

## US-018 — Visualização e download

Como **usuário autorizado**, preciso **acessar documentos do caso sob autorização**, para **consultar os arquivos necessários sem expor documentos a terceiros**.

**Aceite:** URL temporária só é emitida para usuário autorizado e arquivo liberado; outro cliente recebe 404.

**Requisito:** RF-018. **Tarefas:** DEV-023, DEV-025.

## US-019 — Dashboard do cliente

Como **cliente**, preciso **ver casos, pendências, assinatura e últimas atualizações**, para **identificar rapidamente o andamento e as minhas próximas ações**.

**Aceite:** Listagem paginada contém apenas dados próprios e oferece estados de carregamento, vazio e erro.

**Requisito:** RF-019. **Tarefas:** DEV-024, DEV-025.

## US-020 — Dashboard do advogado

Como **advogado**, preciso **organizar fila atribuída e pendências**, para **priorizar o trabalho sob minha responsabilidade**.

**Aceite:** Filtro respeita atribuição; urgência usa datas informadas; caso não atribuído não pode ser consultado.

**Requisito:** RF-020. **Tarefas:** DEV-026, DEV-027.

## US-021 — Geração de procuração

Como **advogado**, preciso **gerar PDF a partir de modelo aprovado e dados do caso**, para **preparar a autorização profissional a partir de um modelo aprovado**.

**Aceite:** Documento referencia versão do modelo; campos obrigatórios ausentes impedem geração.

**Requisito:** RF-021. **Tarefas:** DEV-028, DEV-039.

## US-022 — Assinatura de procuração

Como **cliente**, preciso **baixar, assinar externamente e devolver procuração para conferência**, para **viabilizar a conferência da autorização para atuação**.

**Aceite:** Upload assinado aguarda validação do advogado; rejeição justificada permite novo envio; não presume validade automática.

**Requisito:** RF-022. **Tarefas:** DEV-002, DEV-029, DEV-046, DEV-050.

## US-023 — Timeline do caso

Como **usuário autorizado**, preciso **consultar histórico ordenado de eventos permitidos**, para **entender o que aconteceu no atendimento e quando**.

**Aceite:** Eventos persistem com autor e horário; nota interna nunca aparece na visão do cliente.

**Requisito:** RF-023. **Tarefas:** DEV-030.

## US-024 — Notificações internas

Como **usuário**, preciso **receber e marcar avisos como lidos**, para **perceber mudanças relevantes e pendências**.

**Aceite:** Mudança relevante gera um aviso por destinatário; leitura só altera a notificação do próprio usuário.

**Requisito:** RF-024. **Tarefas:** DEV-032.

## US-025 — E-mails transacionais

Como **usuário**, preciso **receber avisos e links para ações dentro da plataforma**, para **saber quando preciso retornar à plataforma**.

**Aceite:** Reenvio é limitado e deduplicado; e-mail não leva documentos nem conteúdo sensível do caso.

**Requisito:** RF-025. **Tarefas:** DEV-033.

## US-026 — Mensagens do caso

Como **cliente e advogado**, preciso **trocar mensagens assíncronas e registrar notas internas**, para **esclarecer o atendimento preservando a confidencialidade das notas internas**.

**Aceite:** Destinatários respeitam o caso; nota interna é omitida do cliente; texto não executa HTML ou scripts.

**Requisito:** RF-026. **Tarefas:** DEV-031.

## US-027 — Peças jurídicas

Como **advogado**, preciso **cadastrar e versionar minutas vinculadas ao caso**, para **organizar a preparação da defesa e manter suas versões**.

**Aceite:** Minuta é interna; versões preservadas; criação exige atribuição ativa.

**Requisito:** RF-027. **Tarefas:** DEV-034.

## US-028 — Revisão e entrega

Como **advogado**, preciso **revisar e publicar versão final de defesa, petição inicial ou outra peça do caso**, para **disponibilizar ao cliente apenas o material final conferido**.

**Aceite:** Só versão explicitamente revisada fica disponível ao cliente; revisão registra autor, data e versão; publicação não encerra acompanhamento judicial.

**Requisito:** RF-028. **Tarefas:** DEV-034, DEV-057, DEV-046, DEV-049.

## US-029 — Registro de protocolo

Como **advogado**, preciso **registrar manualmente protocolo externo e comprovante**, para **comprovar a atuação externa realizada pelo profissional**.

**Aceite:** Registro exige órgão, identificador, data e comprovante; sistema não afirma ter protocolado automaticamente.

**Requisito:** RF-029. **Tarefas:** DEV-002, DEV-035, DEV-057, DEV-050.

## US-030 — Movimentações

Como **advogado**, preciso **registrar andamento externo manualmente**, para **manter o cliente informado sobre eventos externos registrados**.

**Aceite:** Registro informa fonte e data do evento, separadas da data de cadastro; cliente vê apenas conteúdo publicável.

**Requisito:** RF-030. **Tarefas:** DEV-035.

## US-031 — Prazos informados

Como **advogado**, preciso **cadastrar vencimento, responsável e lembretes**, para **organizar vencimentos confirmados sem pressupor cálculo processual automático**.

**Aceite:** Data é confirmada pelo advogado; sistema não calcula prazo processual; alteração mantém histórico.

**Requisito:** RF-031. **Tarefas:** DEV-036, DEV-056.

## US-032 — Categorias e modelos

Como **administrador**, preciso **gerenciar categorias atendidas e modelos aprovados**, para **oferecer apenas categorias e modelos aprovados**.

**Aceite:** Categoria inativa não aceita novos casos; modelos antigos seguem referenciados nas procurações emitidas.

**Requisito:** RF-032. **Tarefas:** DEV-028, DEV-039.

## US-033 — Administração de usuários

Como **administrador**, preciso **pesquisar contas e controlar seus papéis e bloqueios**, para **manter a equipe e os privilégios sob controle**.

**Aceite:** Elevação de privilégio exige autenticação reforçada e auditoria; não permite remover último administrador ativo.

**Requisito:** RF-033. **Tarefas:** DEV-011, DEV-038.

## US-034 — Administração de assinatura

Como **administrador**, preciso **consultar pedidos e conciliar cancelamentos e estornos**, para **resolver ocorrências financeiras com evidência e rastreabilidade**.

**Aceite:** Estado financeiro vem do provedor; toda intervenção tem motivo; não é possível marcar pagamento pago sem evidência.

**Requisito:** RF-034. **Tarefas:** DEV-016, DEV-040.

## US-035 — Auditoria

Como **administrador autorizado**, preciso **investigar ações críticas e acessos a documentos**, para **investigar ações relevantes sem alterar o histórico**.

**Aceite:** Consulta é filtrada e paginada; eventos não são editáveis pela interface; dados de cartão e segredos não aparecem.

**Requisito:** RF-035. **Tarefas:** DEV-041.

## US-036 — Solicitações de privacidade

Como **cliente**, preciso **solicitar acesso, correção, exportação ou eliminação de dados**, para **acompanhar o tratamento da minha solicitação sobre dados pessoais**.

**Aceite:** Pedido autenticado recebe protocolo e acompanhamento; retenção impeditiva exige justificativa e resposta.

**Requisito:** RF-036. **Tarefas:** DEV-042, DEV-050.

## US-037 — Termos e privacidade

Como **cliente**, preciso **consultar políticas e registrar ciência ou aceite aplicável**, para **entender quais condições e políticas se aplicam à minha relação com a plataforma**.

**Aceite:** Documento tem versão e vigência; aceite registra versão, usuário e horário; não agrega consentimentos opcionais.

**Requisito:** RF-037. **Tarefas:** DEV-008, DEV-043.

## US-038 — Busca de casos

Como **cliente e advogado**, preciso **filtrar lista por estado, categoria e referência**, para **localizar o atendimento relevante sem acessar dados de outras pessoas**.

**Aceite:** Filtros mantêm escopo de acesso e paginação; resultado vazio não é erro.

**Requisito:** RF-038. **Tarefas:** DEV-024, DEV-026.

## US-039 — Encerramento de caso

Como **advogado**, preciso **encerrar e, se necessário, reabrir caso com justificativa**, para **registrar a conclusão do trabalho preservando a possibilidade de revisão justificada**.

**Aceite:** Encerramento preserva documentos; reabertura é auditada e respeita política de atendimento.

**Requisito:** RF-039. **Tarefas:** DEV-019, DEV-057, DEV-037.

## US-040 — Exportação do caso

Como **cliente**, preciso **obter cópia dos documentos publicados e histórico visível**, para **guardar uma cópia do conteúdo que tenho autorização para consultar**.

**Aceite:** Pacote exclui notas e minutas internas; arquivo é privado, expira e exige nova autorização no download.

**Requisito:** RF-040. **Tarefas:** DEV-037.

## US-041 — Cadastro de processo e partes

Como **advogado**, preciso **registrar processo civil, órgão, partes, posição do cliente e vínculo com o caso**, para **distinguir ajuizamento de defesa e acompanhar corretamente as partes e o processo**.

**Aceite:** Permite caso pré-ajuizamento sem número e vinculação após protocolo; cliente autor e réu possuem fluxos próprios; dados de terceiros permanecem privados.

**Requisito:** RF-041. **Tarefas:** DEV-055, DEV-058.

## US-042 — Agenda de audiências

Como **advogado**, preciso **registrar audiências, responsável, local ou link privado, remarcações e resultado**, para **organizar compromissos judiciais sem perder remarcações ou expor acesso à audiência**.

**Aceite:** Choque de agenda do responsável gera alerta; remarcação invalida lembretes antigos; acesso ao link e aos documentos exige vínculo ao caso.

**Requisito:** RF-042. **Tarefas:** DEV-056, DEV-058.

## US-043 — Plano de atuação por caso

Como **advogado**, preciso **definir etapas contratadas e acompanhar atos, peças e protocolos até a conclusão do escopo**, para **cumprir o trabalho assumido até a conclusão das etapas contratadas**.

**Aceite:** Etapas têm responsável, estado, prazo informado e evidência; entrega de peça não encerra processo; fechamento exige avaliação de atos e prazos pendentes.

**Requisito:** RF-043. **Tarefas:** DEV-057, DEV-058.
