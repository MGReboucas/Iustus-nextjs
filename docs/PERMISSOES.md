# Permissões e isolamento

> Proposta para o MVP. Toda autorização é verificada no servidor por ação e recurso.

## Matriz

| Ação | Visitante | Cliente | Advogado | Administrador |
| --- | --- | --- | --- | --- |
| Consultar apresentação e políticas | Sim | Sim | Sim | Sim |
| Criar conta cliente | Sim | — | — | Provisionar conforme fluxo |
| Contratar e consultar assinatura | Não | Própria | Não pelo papel profissional | Metadados financeiros necessários |
| Abrir caso | Não | Próprio, assinatura vigente | Não em nome do cliente no MVP | Não em nome do cliente no MVP |
| Ler relato do caso | Não | Próprio | Atribuído | Somente concessão excepcional temporária |
| Triar e decidir elegibilidade | Não | Não | Atribuído | Só se também advogado atribuído |
| Atribuir profissional | Não | Não | Não | Sim; fila com metadados mínimos |
| Solicitar complemento | Não | Não | Atribuído | Não pelo papel administrativo |
| Enviar documento | Não | Próprio, tipo/estado permitido | Atribuído | Só quando houver atribuição profissional |
| Ler documento | Não | Próprio e visível ao cliente | Atribuído | Concessão excepcional justificada |
| Ler notas e minutas internas | Não | Nunca | Atribuído | Concessão específica, sem acesso automático |
| Conferir procuração / publicar peça | Não | Não | Atribuído | Só se também advogado atribuído |
| Registrar protocolo, movimentação e prazo | Não | Não | Atribuído | Só se também advogado atribuído |
| Escrever mensagem ao caso | Não | Próprio | Atribuído | Não pelo papel administrativo |
| Gerir categorias e usuários | Não | Perfil próprio | Perfil próprio | Sim, MFA e trilha |
| Alterar papel privilegiado | Não | Não | Não | MFA, trilha e preservação do último admin |
| Consultar auditoria | Não | Timeline pública própria | Timeline do caso atribuído | Escopo operacional autorizado |
| Solicitar privacidade | Não | Própria identidade | Própria identidade | Própria identidade; tratar pedidos se designado |
| Editar/apagar histórico | Não | Não | Não | Não pela interface |

Uma conta pode acumular papéis com concessão explícita. O papel administrador não concede automaticamente atribuição de advogado. Um profissional transferido perde acesso na próxima requisição protegida. A fila administrativa exibe referência, categoria, data, estado e responsável; não mostra relato, arquivos ou notas sem concessão.

## Acesso excepcional

Quando necessário para suporte ou investigação, outro administrador autorizado concede acesso a um caso por tempo limitado, com motivo e escopo. Proibir autoaprovação; se houver apenas um administrador, a exceção depende de responsável operacional designado antes da produção. Acesso e download ficam auditados. Essa capacidade deve ser incluída em DEV-038/041, e a política validada em DEV-002.

## Decisão no servidor

Cadastro de processo, partes, etapas e audiências segue a atribuição ativa do caso. Advogado atribuído edita; cliente consulta somente o próprio caso e as informações necessárias ao atendimento. Link de audiência é privado. Administrador continua limitado a metadados operacionais, sem ganhar acesso a processo completo pela nova funcionalidade.

1. Validar sessão ativa e situação da conta.
2. Carregar apenas metadados necessários do recurso.
3. Verificar papel, propriedade, atribuição ativa ou concessão válida.
4. Validar visibilidade, estado do caso e assinatura quando exigida para a ação.
5. Executar operação transacional e registrar evento aplicável.

Para recurso fora do escopo, retornar 404 sem revelar existência. Com SessionAuthentication do DRF, ausência de sessão retorna 403 com código AUTH_REQUIRED; ação não permitida em recurso acessível retorna 403 FORBIDDEN, e falha CSRF retorna 403 CSRF_FAILED. O contrato padroniza esses códigos para a interface distinguir as situações. URLs assinadas expiram em até 5 minutos (meta proposta); a emissão exige autorização. Revogação não invalida automaticamente uma URL já emitida, portanto documentos muito sensíveis podem exigir proxy de download com nova checagem. Decidir em DEV-023 conforme provedor.

## Verificações obrigatórias

Dois clientes, dois advogados e um administrador em massa sintética: trocar IDs em URL, corpo, cursor, versão, exportação e assinatura; reusar sessão após bloqueio; acessar depois de transferência; tentar definir role no cadastro; consultar nota interna pela API; baixar arquivo em quarentena; usar concessão expirada. Todos os caminhos devem negar acesso indevido, inclusive os que não têm botão na interface.
