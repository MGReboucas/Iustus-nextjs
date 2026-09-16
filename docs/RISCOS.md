# Riscos e plano de resposta

> Avaliação qualitativa inicial. Probabilidade e impacto são julgamento de engenharia, sujeitos a revisão na fase 0.

| ID | Risco | Probabilidade / impacto | Mitigação / tarefa | Gatilho e responsável |
| --- | --- | --- | --- | --- |
| R-01 | Dados de cartão enviados ao backend e possível captura por logs | Alta / crítico | Corrigir payload e provar minimização, DEV-013/044 | Qualquer PAN/CVV em tráfego interno bloqueia cobrança real; desenvolvedor |
| R-02 | Falsa aprovação ou cobrança repetida | Alta / crítico | Pedido, status, idempotência e conciliação, DEV-014–016 | Timeout desconhecido ou replay com duplicação; desenvolvedor |
| R-03 | API PagBank não habilitada ou incompatível com código atual | Média / alto | Confirmar produto/contrato antes de consolidar integração, DEV-012 | Falha de habilitação; titular da conta + desenvolvedor |
| R-04 | Escopo jurídico indefinido expande MVP | Alta / alto | Validar H-02/H-04/H-06 e catálogo, DEV-002 | Nova categoria, automação judicial ou assinatura integrada; produto/jurídico |
| R-05 | Estimativa otimista para um desenvolvedor | Média / alto | Sequência serial, reserva explícita e revisão por fase | Desvio de fase maior que reserva; desenvolvedor + produto |
| R-06 | Feriados, férias e início real não confirmados | Alta / médio | Preencher nonWorkingDates e recalcular, EXT-04 | Mudança de calendário; desenvolvedor |
| R-07 | Acesso cruzado ou exposição de arquivo jurídico | Média / crítico | Permissão por recurso, privacidade de objetos e testes, DEV-007/023/041 | Qualquer teste de isolamento falha; bloqueia lançamento |
| R-08 | Scanner/worker/e-mail indisponíveis | Média / alto | Quarentena segura, retry e fila de falhas, DEV-022/032/033 | Jobs excedem janela; operação |
| R-09 | Ausência de política de retenção ou responsável por dados | Média / alto | Inventário e validação externa, DEV-042 | Política não aprovada em M9; jurídico/produto |
| R-10 | Perda de banco ou documentos sem recuperação confiável | Média / crítico | Ensaio de restauração, DEV-048/052 | Backup incompleto ou RTO excedido; operação |
| R-11 | Homologadores e fornecedores atrasam | Média / alto | Agendar e obter insumos antecipadamente, EXT-01/03/05 | Insumo ausente na tarefa; registrar espera e recalcular |
| R-12 | Operação permanente excede capacidade de uma pessoa | Alta / alto | Nomear responsável e cobertura, EXT-06 | Sem resposta a alertas; revisar meta ou bloquear produção |
| R-13 | Dependências instaladas exigem atualização incompatível | Média / alto | Revisar suporte/segurança e validar migração, DEV-004/044 | Vulnerabilidade ou build incompatível; desenvolvedor |
| R-14 | Oferta pública diverge de fluxo real | Alta / alto | Corrigir parcelas, termos e status, DEV-013/043 | Informação comercial sem suporte; produto |
| R-15 | Contrato ou implantação incompatível entre Next.js, Django e worker | Média / alto | OpenAPI, CI dos dois runtimes, migração única e reversão compatível, DEV-059/061/063/064 | Falha de contrato, isolamento de portal ou readiness; desenvolvedor bloqueia release |

## Contingência e mudança de escopo

Reserva de 20% por fase, arredondada para dias completos, cobre retrabalho e imprevistos do escopo estimado. Não substitui tarefas conhecidas de teste, segurança ou infraestrutura, já estimadas. Nem todo risco é absorvível por horas: aprovação externa, mudança de modelo de negócio e exigência de nova integração podem exigir nova baseline.

Ao materializar risco, registrar data, impacto, horas consumidas, atraso de calendário, decisão e saldo de reserva. Se exceder a reserva da fase, reestimar tarefas restantes e publicar novos marcos. Acrescentar funcionalidades depende de alteração explícita do MVP, requisitos, backlog e critérios de aceite.
