# Visão geral

> Versão 1.0 · 16/09/2026 · Proposta de produto sujeita às decisões registradas.

A Iustus pretende centralizar contratação, envio de casos, documentos, procurações, acompanhamento e entrega de defesas jurídicas em uma plataforma digital. A oferta encontrada é de R$ 547 por ano, com uso ilimitado durante a vigência e anúncio de pagamento à vista ou em 6 ou 12 parcelas. A elegibilidade dos casos, limites da atuação e condições contratuais ainda dependem de validação da operação.

## Objetivo do MVP

**Definição confirmada pelo usuário:** escritório próprio no Rio Grande do Norte, inicialmente com dois advogados, para multas de trânsito e direito civil em geral, excluindo apenas família e sucessões do civil. Na área civil, o escritório ajuíza, defende, protocola e acompanha; consumo, imobiliário e demais matérias civis estão incluídos. Checklists e cobertura contratual por fase permanecem em detalhamento em [Regras do serviço](REGRAS_DO_SERVICO.md). A equipe jurídica não altera a premissa de um desenvolvedor a 8h/dia.

Permitir que um cliente autenticado com assinatura confirmada submeta um caso; um advogado designado avalie, prepare peças e execute a atuação contratada; e o cliente acompanhe pendências, entregas e andamento. No civil, a jornada inclui ajuizamento ou defesa e acompanhamento judicial, com autorização de acesso, histórico e documentos privados.

## Atores e responsabilidades

| Ator | Responsabilidade |
| --- | --- |
| Visitante | Conhecer proposta e condições e iniciar cadastro |
| Cliente | Contratar, relatar caso, fornecer documentos, assinar procuração e consultar entrega |
| Advogado | Avaliar elegibilidade, conferir documentos, preparar e revisar defesa, informar prazos e andamento |
| Administrador | Provisionar equipe, atribuir casos, manter categorias e acompanhar operação |
| Responsável jurídico do escritório, a designar | Validar serviço, modelos, fluxo profissional, comunicação e política de dados; trabalho distinto das horas do desenvolvedor |
| Desenvolvedor único | Construir, testar, configurar, documentar e preparar operação em 8h/dia |

O administrador não é automaticamente autorizado a atuar como advogado. Acesso a conteúdo jurídico requer atribuição profissional ou concessão excepcional justificada conforme [Permissões](PERMISSOES.md).

## Jornada pretendida

Cadastro verificado → contratação confirmada → abertura de caso → atribuição e triagem → complementação e procuração conferida → preparação e revisão da peça adequada → protocolo pelo escritório nos sistemas oficiais → acompanhamento, audiências e novos atos conforme escopo → encerramento após revisão das obrigações, preservando histórico.

O dashboard exibido na landing é uma ilustração. O estado implementado está em [Estado atual](ESTADO_ATUAL.md).

## Critérios de sucesso propostos

- Concluir a jornada acima em homologação para todos os papéis, sem intervenção direta no banco.
- Impedir acesso cruzado entre clientes e entre advogados não atribuídos em todos os cenários críticos.
- Não liberar assinatura por código de transação sem confirmação financeira.
- Manter 100% das mudanças críticas de caso e pagamento rastreáveis.
- Comprovar restauração antes do lançamento e atender às metas técnicas de [RNF](REQUISITOS_NAO_FUNCIONAIS.md).

Após piloto, medir tempo entre submissão e triagem, pendências por caso, prazo entre aceite e entrega, falhas de pagamento e abandono do checkout. Não existem dados de produção neste levantamento para fixar metas comerciais confiáveis; produto e operação definirão essas metas a partir do piloto.

## Limites do levantamento

Fontes: arquivos versionáveis do repositório, texto fornecido pelo usuário e referências oficiais listadas em [Fontes](FONTES.md). Não foram realizadas entrevistas, verificação de credenciais, cobrança, auditoria formal ou validação jurídica do modelo comercial. Serviços contratados e dados reais não foram acessados.
