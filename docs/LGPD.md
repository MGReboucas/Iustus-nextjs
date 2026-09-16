# Privacidade e governança de dados

> Plano técnico inicial, pendente de validação do responsável pelo tratamento e do responsável jurídico. Não declara conformidade concluída.

A LGPD estabelece princípios para tratamento, hipóteses legais, direitos dos titulares e medidas de segurança. A classificação de papéis, finalidade, base legal e prazo de conservação deve ser feita por operação de tratamento, considerando também documentos que contenham dados sensíveis e de terceiros. Consentimento não deve ser escolhido automaticamente como base para tudo. Referência primária: [Lei nº 13.709/2018, texto compilado](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm).

## Inventário inicial proposto

| Conjunto | Finalidade pretendida | Pessoas com acesso | Retenção / decisão pendente |
| --- | --- | --- | --- |
| Identidade e perfil | Identificar cliente e controlar conta | Titular e operação autorizada | Definir após encerramento; minimizar campos |
| Pedido e assinatura | Contratação, conciliação e prestação de contas | Titular, financeiro e operadores necessários | Definir obrigações aplicáveis e evidências a conservar |
| Relato e documentos do caso | Avaliação e execução do serviço | Cliente e advogado atribuído | Validar prazos por categoria e hipóteses de retenção |
| Processos, partes e audiências | Ajuizamento, defesa e acompanhamento civil | Advogado atribuído; cliente recebe somente informação pertinente ao próprio caso | Minimizar dados de terceiros e proteger links de audiência; retenção por finalidade a validar |
| Procuração e assinatura | Comprovar autorização profissional | Cliente e advogado atribuído | Procedimento jurídico e evidência a definir |
| Minutas e notas internas | Preparação profissional e revisão | Advogado atribuído | Política específica; não exportar automaticamente ao cliente |
| Mensagens e timeline | Comunicação e rastreabilidade | Participantes conforme visibilidade | Vincular ao ciclo do caso e retenções |
| Auditoria e segurança | Investigar acesso, abuso e incidentes | Operação com acesso restrito | Aprovar janela e minimização de metadados |
| E-mail transacional | Avisar sobre ações na plataforma | Destinatário e provedor contratado | Mensagem genérica; definir retenção no provedor |
| Exportações | Responder a solicitação e disponibilizar cópia | Solicitante autorizado | Proposta: expiração de 24h e limpeza automática |
| Backups | Recuperação de desastre | Operador de infraestrutura restrito | Proposta: ciclo diário de 30 dias, sujeito a aprovação |

As janelas de 24h e 30 dias são propostas operacionais, não prazos impostos pela lei. Prazo definitivo de dados jurídicos, financeiros, logs e pedidos deve ser aprovado antes de DEV-042; não inventar uma duração universal. Dados de cartão não integram banco/logs da aplicação; rever também coleta de endereço e data de nascimento conforme exigência efetiva do produto de pagamento.

## Registro de tratamento a completar em DEV-002/042

Para cada linha do inventário, registrar controlador, operadores/suboperadores, titular, dados, origem, finalidade, hipótese legal validada, compartilhamentos, país/região, prazo, justificativa e medidas de proteção. Identificar quem decide e quem executa em cada relação; não classificar automaticamente o advogado como mero operador. Selecionar fornecedores somente após revisar contratos, exportação, exclusão e localização do tratamento.

## Atendimento ao titular

Canal público nas políticas e área autenticada de solicitações. Fluxo: receber e protocolar → confirmar identidade de forma proporcional → delimitar dados e avaliar terceiros/retenções → decidir → executar ação permitida → responder → registrar evidência. A operação deve definir prazos e responsáveis aplicáveis com revisão jurídica; o sistema registra `due_at` e alerta atraso. Não prometer eliminação imediata e irrestrita de todos os registros.

Exportações ficam privadas, com expiração e autorização no download. Correção deve preservar histórico quando necessário. Retenção impeditiva registra motivo, responsável e data de revisão. Restauração de backup deve reaplicar decisões de eliminação/restrição para não reintroduzir dados indevidamente no ambiente ativo.

## Políticas, comunicação e incidentes

Publicar identidade da operação, finalidades, compartilhamentos, canal responsável, direitos e condições pertinentes em texto aprovado. Registrar versão de termos e aceite quando aplicável; manter escolhas opcionais separadas. Não presumir que marcar “li e aceito” substitui análise da base legal.

Em incidente: acionar responsável, conter, preservar evidências, avaliar dados/titulares afetados e documentar decisão sobre comunicações e medidas. Responsável jurídico deve verificar a regulamentação vigente e os prazos aplicáveis antes de aprovar o procedimento; esta versão não fixa prazo legal de notificação. O [guia de segurança da ANPD](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/processo-guia-orientativo-sobre-seguranca-da-informacao-para-agentes-de-tratamento-de-pequeno-porte.pdf) orienta a organização de medidas técnicas e administrativas; o enquadramento da Iustus não foi presumido.

## Evidências exigidas antes da produção

Inventário e políticas aprovados; responsáveis nomeados; contratos de fornecedores revisados; matriz de acesso testada; retenção e descarte ensaiados com dados sintéticos; solicitação de titular executada de ponta a ponta; registro de treinamento operacional; simulação de incidente e restauração. Esses itens são dependências de liberação e tarefas planejadas, não evidências já existentes.
