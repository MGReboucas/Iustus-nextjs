# Fluxos e máquinas de estados

> Estados canônicos propostos. O adaptador financeiro deve mapear os estados da API efetivamente habilitada.

## Jornada principal

```mermaid
flowchart TD
    A[Cadastro e e-mail verificado] --> B[Pedido e pagamento]
    B --> C{Confirmação financeira?}
    C -->|Pendente| D[Acompanhar e reconciliar]
    D --> C
    C -->|Recusado| B
    C -->|Pago| E[Assinatura ativa]
    E --> F[Rascunho e submissão]
    F --> G[Atribuição e triagem]
    G --> H{Elegível?}
    H -->|Não| I[Recusa justificada]
    H -->|Complementar| J[Pendência ao cliente]
    J --> G
    H -->|Sim| K[Procuração e documentos conferidos]
    K --> L[Preparação e revisão]
    L --> M[Peça revisada: inicial, defesa ou outro ato]
    M --> N[Protocolo externo pelo escritório]
    N --> O[Acompanhamento, audiências e novos atos]
    O --> P{Há nova atuação pendente?}
    P -->|Sim| L
    P -->|Não| Q[Revisão do escopo e encerramento]
```

## Estado do caso

```mermaid
stateDiagram-v2
    [*] --> RASCUNHO
    RASCUNHO --> SUBMETIDO: cliente com vigência
    SUBMETIDO --> EM_TRIAGEM: profissional atribuído
    EM_TRIAGEM --> AGUARDANDO_CLIENTE: complemento
    AGUARDANDO_CLIENTE --> EM_TRIAGEM: profissional resolve pendência
    EM_TRIAGEM --> RECUSADO: motivo
    EM_TRIAGEM --> ACEITO: elegível
    ACEITO --> EM_PREPARACAO: procuração conferida
    EM_PREPARACAO --> AGUARDANDO_CLIENTE: novo complemento
    AGUARDANDO_CLIENTE --> EM_PREPARACAO: retomar preparação
    EM_PREPARACAO --> EM_REVISAO
    EM_REVISAO --> EM_PREPARACAO: ajustes
    EM_REVISAO --> ENTREGUE: publicar versão revisada
    EM_REVISAO --> AGUARDANDO_PROTOCOLO: peça judicial revisada
    AGUARDANDO_PROTOCOLO --> EM_ACOMPANHAMENTO: comprovante registrado
    ENTREGUE --> EM_ACOMPANHAMENTO: registro externo
    EM_ACOMPANHAMENTO --> EM_PREPARACAO: novo ato necessário
    ENTREGUE --> ENCERRADO
    EM_ACOMPANHAMENTO --> ENCERRADO
    ENCERRADO --> EM_TRIAGEM: reabrir com motivo
```

| Origem → destino | Autor e pré-condição |
| --- | --- |
| RASCUNHO → SUBMETIDO | Cliente proprietário, campos válidos e assinatura vigente; não exige procuração conferida para submeter |
| SUBMETIDO → EM_TRIAGEM | Advogado já atribuído; atribuição é ato administrativo anterior |
| EM_TRIAGEM → AGUARDANDO_CLIENTE / RECUSADO / ACEITO | Advogado atribuído; motivo e checklist de triagem |
| ACEITO → EM_PREPARACAO | Advogado atribuído; documentos mínimos e procuração aprovada |
| EM_PREPARACAO → AGUARDANDO_CLIENTE | Pendência aberta registra `resume_state = EM_PREPARACAO` |
| AGUARDANDO_CLIENTE → estado de retorno | Advogado resolve todas as pendências bloqueantes; retorno só ao `resume_state` registrado, nunca escolhido arbitrariamente |
| EM_PREPARACAO → EM_REVISAO | Minuta completa disponível |
| EM_REVISAO → ENTREGUE | Versão exata revisada e publicada atomicamente |
| EM_REVISAO → AGUARDANDO_PROTOCOLO | Advogado confirma peça judicial revisada, etapa e prazo de protocolo; disponibilização ao cliente é evento de documento separado |
| AGUARDANDO_PROTOCOLO → EM_ACOMPANHAMENTO | Protocolo realizado pelo escritório em sistema oficial e comprovante vinculado; sem presumir automação |
| EM_ACOMPANHAMENTO → EM_PREPARACAO | Novo ato, resposta, recurso ou outra peça necessária dentro do escopo, sem apagar acompanhamento anterior |
| ENTREGUE → EM_ACOMPANHAMENTO | Registro de atuação externa aplicável; não significa protocolo automático |
| ENTREGUE / EM_ACOMPANHAMENTO → ENCERRADO | Advogado registra motivo e conclusão do escopo, sem prazo, audiência ou etapa bloqueante pendente; entrega de peça isolada não encerra atuação civil |
| ENCERRADO → EM_TRIAGEM | Advogado atribuído, motivo e política de atendimento satisfeita; sem gerar novo direito de atendimento automaticamente |

Estado RECUSADO encerra aquela submissão; cliente pode criar novo caso se elegível e com vigência. Exclusão de rascunho é lógica. Cancelamento solicitado pelo cliente em caso aceito vira pedido ao advogado, sem apagar caso, prazo ou evidência. Alteração concorrente usa `version` e retorna 409.

**Ramos civis:** cliente autor pode iniciar sem número de processo; após ajuizamento, registrar número/órgão/partes e comprovante. Cliente réu informa processo e documentos de citação/intimação disponíveis; advogado confirma prazos e defesa cabível. Acompanhamento oficial é responsabilidade do escritório, com movimentações inseridas manualmente na Iustus no MVP. Não inferir que prazo deixa de correr enquanto o cliente complementa documentos.

## Pedido e assinatura

Pedido: `CREATED → PENDING → PAID` ou `DECLINED / CANCELED`. Timeout após envio cria `UNKNOWN`; reconciliar antes de permitir nova tentativa financeira. Após pago, pode haver `REFUNDED / DISPUTED`; consulta autoritativa resolve eventos fora de ordem. Não aplicar uma ordenação numérica de status como se todos fossem progresso linear.

Assinatura: `PENDING → ACTIVE → EXPIRED`. Reembolso confirmado pode levar a `CANCELED`; contestação pode levar a `SUSPENDED` conforme política validada. Assinatura nunca fica ativa só porque a criação da transação retornou HTTP 200. Renovação cria novo pedido e período sem duplicar ou sobrepor indevidamente a vigência.

## Documento e procuração

Documento: `UPLOADING → QUARANTINED → AVAILABLE` ou `REJECTED`. Falha temporária do scanner permanece em quarentena com retry limitado. Versão anterior liberada permanece acessível mesmo quando nova versão ainda está em análise, conforme visibilidade.

Procuração: `GENERATED → AWAITING_SIGNATURE → SUBMITTED → APPROVED / REJECTED`. Após rejeição, novo arquivo gera nova submissão. Aprovação exige responsável e evidência de conferência; upload sozinho não comprova validade da assinatura.

## Efeitos assíncronos

```mermaid
sequenceDiagram
    participant U as Usuário
    participant A as API
    participant D as Banco
    participant W as Worker
    participant E as E-mail
    U->>A: Ação autorizada e versão esperada
    A->>D: Transação: mudança + histórico + outbox
    D-->>A: Commit
    A-->>U: Resultado confirmado
    W->>D: Reservar job disponível
    W->>E: Enviar aviso sem conteúdo sensível
    alt entrega aceita
      W->>D: Registrar sucesso
    else falha
      W->>D: Retry com limite ou fila de falhas
    end
```
