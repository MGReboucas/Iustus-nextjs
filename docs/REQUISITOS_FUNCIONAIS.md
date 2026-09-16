# Requisitos funcionais

> Revisão 1.5 · Base: 16/09/2026 · Arquitetura aprovada; validação operacional pendente.

Catálogo de 43 requisitos do MVP proposto. MUST significa necessário para o escopo desta baseline, e não funcionalidade já implementada. A evidência atual está em [Estado atual](ESTADO_ATUAL.md). Os critérios abaixo devem ser testados; as evidências do primeiro incremento de acesso estão em [Acesso local](ACESSO.md), sem aceite integral do MVP.

Origem: proposta comercial e fluxos existentes no repositório, diretrizes fornecidas e detalhamento de engenharia. A lista constitui proposta a validar, não relato de entrevistas já realizadas. Regras e hipóteses em [Regras de negócio](REGRAS_DE_NEGOCIO.md) e [Decisões](DECISOES.md).

## RF-001 — Apresentação pública

**Ator:** Visitante. **Prioridade:** MUST.

Conhecer plano, limites do serviço e canais de acesso.

**Critério de aceite:** Preço, condições e links de termos coincidem com a política aprovada; nenhum depoimento fictício aparece como real.

**Rastreabilidade:** US-001; DEV-043.

## RF-002 — Cadastro de cliente

**Ator:** Cliente. **Prioridade:** MUST.

Criar conta com e-mail verificado e aceite versionado.

**Critério de aceite:** E-mail duplicado não cria outra conta; token expirado não verifica cadastro.

**Rastreabilidade:** US-002; DEV-008.

## RF-003 — Login e logout

**Ator:** Usuário. **Prioridade:** MUST.

Autenticar e encerrar a própria sessão.

**Critério de aceite:** Credenciais válidas abrem sessão; logout impede reutilização; falhas não revelam existência da conta.

**Rastreabilidade:** US-003; DEV-009, DEV-061.

## RF-004 — Recuperação de acesso

**Ator:** Usuário. **Prioridade:** MUST.

Recuperar senha por token temporário de uso único.

**Critério de aceite:** Token usado ou expirado é rejeitado; alteração revoga sessões anteriores.

**Rastreabilidade:** US-004; DEV-010.

## RF-005 — Controle de sessões

**Ator:** Administrador. **Prioridade:** MUST.

Bloquear conta e revogar sessões.

**Critério de aceite:** Conta bloqueada perde acesso em nova requisição protegida, inclusive com cookie anterior.

**Rastreabilidade:** US-005; DEV-009, DEV-061.

## RF-006 — Convite de advogado

**Ator:** Administrador. **Prioridade:** MUST.

Convidar advogado com perfil aprovado pela operação.

**Critério de aceite:** Convite expira; cliente não consegue atribuir a si próprio papel de advogado.

**Rastreabilidade:** US-006; DEV-011.

## RF-007 — Perfil do cliente

**Ator:** Cliente. **Prioridade:** MUST.

Consultar e corrigir os próprios dados cadastrais.

**Critério de aceite:** Atualização valida campos, exige revalidação de e-mail e não permite alterar papel ou assinatura.

**Rastreabilidade:** US-007; DEV-005, DEV-010.

## RF-008 — Checkout seguro

**Ator:** Cliente. **Prioridade:** MUST.

Contratar o plano com preço e parcelas confirmados pelo servidor.

**Critério de aceite:** Payload interno não contém PAN, CVV ou validade; parcela adulterada é rejeitada; pedido pertence ao cliente autenticado.

**Rastreabilidade:** US-008; DEV-001, DEV-012, DEV-013, DEV-062, DEV-014, DEV-046.

## RF-009 — Conciliação de pagamento

**Ator:** Sistema. **Prioridade:** MUST.

Confirmar estados de pagamento por comunicação verificada com o provedor.

**Critério de aceite:** Evento repetido não duplica ativação; código de transação sem confirmação não libera acesso.

**Rastreabilidade:** US-009; DEV-001, DEV-012, DEV-062, DEV-015, DEV-046.

## RF-010 — Vigência da assinatura

**Ator:** Cliente. **Prioridade:** MUST.

Consultar situação, início e fim do período contratado.

**Critério de aceite:** Vigência é persistida; expiração bloqueia novas submissões; histórico continua acessível conforme política aprovada.

**Rastreabilidade:** US-010; DEV-002, DEV-005, DEV-016, DEV-040, DEV-050.

## RF-011 — Abertura de caso

**Ator:** Cliente. **Prioridade:** MUST.

Salvar rascunho e submeter relato, categoria e documentos.

**Critério de aceite:** Rascunho pode ser incompleto; submissão valida campos e vigência no servidor; reenvio não duplica caso.

**Rastreabilidade:** US-011; DEV-005, DEV-017, DEV-025.

## RF-012 — Triagem de caso

**Ator:** Advogado. **Prioridade:** MUST.

Avaliar elegibilidade e suficiência das informações.

**Critério de aceite:** Somente profissional designado registra aceite, recusa justificada ou pendência; família e sucessões ficam fora do escopo civil conforme RN-025, demais matérias civis não são recusadas só por não constarem dos exemplos; cliente visualiza motivo publicável.

**Rastreabilidade:** US-012; DEV-002, DEV-018, DEV-027, DEV-049.

## RF-013 — Atribuição de caso

**Ator:** Administrador. **Prioridade:** MUST.

Designar e substituir o advogado responsável.

**Critério de aceite:** Há um responsável ativo; troca registra motivo e revoga acesso do anterior.

**Rastreabilidade:** US-013; DEV-018, DEV-038.

## RF-014 — Estados do caso

**Ator:** Advogado. **Prioridade:** MUST.

Atualizar o andamento pelas transições permitidas.

**Critério de aceite:** Transição inválida ou concorrente retorna conflito sem alterar histórico.

**Rastreabilidade:** US-014; DEV-019, DEV-027.

## RF-015 — Solicitação de complemento

**Ator:** Advogado. **Prioridade:** MUST.

Solicitar documentos ou esclarecimentos ao cliente.

**Critério de aceite:** Solicitação tem descrição, autor e estado; resposta mantém vínculo ao caso e permite resolução explícita.

**Rastreabilidade:** US-015; DEV-020, DEV-025.

## RF-016 — Upload privado

**Ator:** Cliente. **Prioridade:** MUST.

Anexar arquivos permitidos ao próprio caso.

**Critério de aceite:** Arquivo acima de 20 MiB ou tipo incompatível é recusado; arquivo fica em quarentena até verificação.

**Rastreabilidade:** US-016; DEV-021, DEV-022.

## RF-017 — Versões de documentos

**Ator:** Usuário autorizado. **Prioridade:** MUST.

Substituir documento sem apagar versões anteriores.

**Critério de aceite:** Nova versão preserva hash, autor e referência anterior; download de versão antiga segue a mesma autorização.

**Rastreabilidade:** US-017; DEV-023.

## RF-018 — Visualização e download

**Ator:** Usuário autorizado. **Prioridade:** MUST.

Acessar documentos do caso sob autorização.

**Critério de aceite:** URL temporária só é emitida para usuário autorizado e arquivo liberado; outro cliente recebe 404.

**Rastreabilidade:** US-018; DEV-023, DEV-025.

## RF-019 — Dashboard do cliente

**Ator:** Cliente. **Prioridade:** MUST.

Ver casos, pendências, assinatura e últimas atualizações.

**Critério de aceite:** Listagem paginada contém apenas dados próprios e oferece estados de carregamento, vazio e erro.

**Rastreabilidade:** US-019; DEV-024, DEV-025.

## RF-020 — Dashboard do advogado

**Ator:** Advogado. **Prioridade:** MUST.

Organizar fila atribuída e pendências.

**Critério de aceite:** Filtro respeita atribuição; urgência usa datas informadas; caso não atribuído não pode ser consultado.

**Rastreabilidade:** US-020; DEV-026, DEV-027.

## RF-021 — Geração de procuração

**Ator:** Advogado. **Prioridade:** MUST.

Gerar PDF a partir de modelo aprovado e dados do caso.

**Critério de aceite:** Documento referencia versão do modelo; campos obrigatórios ausentes impedem geração.

**Rastreabilidade:** US-021; DEV-028, DEV-039.

## RF-022 — Assinatura de procuração

**Ator:** Cliente. **Prioridade:** MUST.

Baixar, assinar externamente e devolver procuração para conferência.

**Critério de aceite:** Upload assinado aguarda validação do advogado; rejeição justificada permite novo envio; não presume validade automática.

**Rastreabilidade:** US-022; DEV-002, DEV-029, DEV-046, DEV-050.

## RF-023 — Timeline do caso

**Ator:** Usuário autorizado. **Prioridade:** MUST.

Consultar histórico ordenado de eventos permitidos.

**Critério de aceite:** Eventos persistem com autor e horário; nota interna nunca aparece na visão do cliente.

**Rastreabilidade:** US-023; DEV-030.

## RF-024 — Notificações internas

**Ator:** Usuário. **Prioridade:** MUST.

Receber e marcar avisos como lidos.

**Critério de aceite:** Mudança relevante gera um aviso por destinatário; leitura só altera a notificação do próprio usuário.

**Rastreabilidade:** US-024; DEV-032.

## RF-025 — E-mails transacionais

**Ator:** Usuário. **Prioridade:** MUST.

Receber avisos e links para ações dentro da plataforma.

**Critério de aceite:** Reenvio é limitado e deduplicado; e-mail não leva documentos nem conteúdo sensível do caso.

**Rastreabilidade:** US-025; DEV-033.

## RF-026 — Mensagens do caso

**Ator:** Cliente e advogado. **Prioridade:** MUST.

Trocar mensagens assíncronas e registrar notas internas.

**Critério de aceite:** Destinatários respeitam o caso; nota interna é omitida do cliente; texto não executa HTML ou scripts.

**Rastreabilidade:** US-026; DEV-031.

## RF-027 — Peças jurídicas

**Ator:** Advogado. **Prioridade:** MUST.

Cadastrar e versionar minutas vinculadas ao caso.

**Critério de aceite:** Minuta é interna; versões preservadas; criação exige atribuição ativa.

**Rastreabilidade:** US-027; DEV-034.

## RF-028 — Revisão e entrega

**Ator:** Advogado. **Prioridade:** MUST.

Revisar e publicar versão final de defesa, petição inicial ou outra peça do caso.

**Critério de aceite:** Só versão explicitamente revisada fica disponível ao cliente; revisão registra autor, data e versão; publicação não encerra acompanhamento judicial.

**Rastreabilidade:** US-028; DEV-034, DEV-057, DEV-046, DEV-049.

## RF-029 — Registro de protocolo

**Ator:** Advogado. **Prioridade:** MUST.

Registrar manualmente protocolo externo e comprovante.

**Critério de aceite:** Registro exige órgão, identificador, data e comprovante; sistema não afirma ter protocolado automaticamente.

**Rastreabilidade:** US-029; DEV-002, DEV-035, DEV-057, DEV-050.

## RF-030 — Movimentações

**Ator:** Advogado. **Prioridade:** MUST.

Registrar andamento externo manualmente.

**Critério de aceite:** Registro informa fonte e data do evento, separadas da data de cadastro; cliente vê apenas conteúdo publicável.

**Rastreabilidade:** US-030; DEV-035.

## RF-031 — Prazos informados

**Ator:** Advogado. **Prioridade:** MUST.

Cadastrar vencimento, responsável e lembretes.

**Critério de aceite:** Data é confirmada pelo advogado; sistema não calcula prazo processual; alteração mantém histórico.

**Rastreabilidade:** US-031; DEV-036, DEV-056.

## RF-032 — Categorias e modelos

**Ator:** Administrador. **Prioridade:** MUST.

Gerenciar categorias atendidas e modelos aprovados.

**Critério de aceite:** Categoria inativa não aceita novos casos; modelos antigos seguem referenciados nas procurações emitidas.

**Rastreabilidade:** US-032; DEV-028, DEV-039.

## RF-033 — Administração de usuários

**Ator:** Administrador. **Prioridade:** MUST.

Pesquisar contas e controlar seus papéis e bloqueios.

**Critério de aceite:** Elevação de privilégio exige autenticação reforçada e auditoria; não permite remover último administrador ativo.

**Rastreabilidade:** US-033; DEV-011, DEV-038.

## RF-034 — Administração de assinatura

**Ator:** Administrador. **Prioridade:** MUST.

Consultar pedidos e conciliar cancelamentos e estornos.

**Critério de aceite:** Estado financeiro vem do provedor; toda intervenção tem motivo; não é possível marcar pagamento pago sem evidência.

**Rastreabilidade:** US-034; DEV-016, DEV-040.

## RF-035 — Auditoria

**Ator:** Administrador autorizado. **Prioridade:** MUST.

Investigar ações críticas e acessos a documentos.

**Critério de aceite:** Consulta é filtrada e paginada; eventos não são editáveis pela interface; dados de cartão e segredos não aparecem.

**Rastreabilidade:** US-035; DEV-041.

## RF-036 — Solicitações de privacidade

**Ator:** Cliente. **Prioridade:** MUST.

Solicitar acesso, correção, exportação ou eliminação de dados.

**Critério de aceite:** Pedido autenticado recebe protocolo e acompanhamento; retenção impeditiva exige justificativa e resposta.

**Rastreabilidade:** US-036; DEV-042, DEV-050.

## RF-037 — Termos e privacidade

**Ator:** Cliente. **Prioridade:** MUST.

Consultar políticas e registrar ciência ou aceite aplicável.

**Critério de aceite:** Documento tem versão e vigência; aceite registra versão, usuário e horário; não agrega consentimentos opcionais.

**Rastreabilidade:** US-037; DEV-008, DEV-043.

## RF-038 — Busca de casos

**Ator:** Cliente e advogado. **Prioridade:** MUST.

Filtrar lista por estado, categoria e referência.

**Critério de aceite:** Filtros mantêm escopo de acesso e paginação; resultado vazio não é erro.

**Rastreabilidade:** US-038; DEV-024, DEV-026.

## RF-039 — Encerramento de caso

**Ator:** Advogado. **Prioridade:** MUST.

Encerrar e, se necessário, reabrir caso com justificativa.

**Critério de aceite:** Encerramento preserva documentos; reabertura é auditada e respeita política de atendimento.

**Rastreabilidade:** US-039; DEV-019, DEV-057, DEV-037.

## RF-040 — Exportação do caso

**Ator:** Cliente. **Prioridade:** MUST.

Obter cópia dos documentos publicados e histórico visível.

**Critério de aceite:** Pacote exclui notas e minutas internas; arquivo é privado, expira e exige nova autorização no download.

**Rastreabilidade:** US-040; DEV-037.

## RF-041 — Cadastro de processo e partes

**Ator:** Advogado. **Prioridade:** MUST.

Registrar processo civil, órgão, partes, posição do cliente e vínculo com o caso.

**Critério de aceite:** Permite caso pré-ajuizamento sem número e vinculação após protocolo; cliente autor e réu possuem fluxos próprios; dados de terceiros permanecem privados.

**Rastreabilidade:** US-041; DEV-055, DEV-058.

## RF-042 — Agenda de audiências

**Ator:** Advogado. **Prioridade:** MUST.

Registrar audiências, responsável, local ou link privado, remarcações e resultado.

**Critério de aceite:** Choque de agenda do responsável gera alerta; remarcação invalida lembretes antigos; acesso ao link e aos documentos exige vínculo ao caso.

**Rastreabilidade:** US-042; DEV-056, DEV-058.

## RF-043 — Plano de atuação por caso

**Ator:** Advogado. **Prioridade:** MUST.

Definir etapas contratadas e acompanhar atos, peças e protocolos até a conclusão do escopo.

**Critério de aceite:** Etapas têm responsável, estado, prazo informado e evidência; entrega de peça não encerra processo; fechamento exige avaliação de atos e prazos pendentes.

**Rastreabilidade:** US-043; DEV-057, DEV-058.
