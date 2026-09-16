# Worker de identidade

O processo Django separado deliver_identity_mail consome IdentityEmail no PostgreSQL. Usa lease, retry limitado e apaga o corpo criptografado após envio confirmado. Localmente entrega em arquivos, sem SMTP externo. Rodar com --once drena os itens disponíveis e encerra.

Há possibilidade de reenvio após falha entre entrega e confirmação; tokens continuam de uso único. Alertas operacionais e tratamento manual de falhas permanentes ainda precisam de homologação. Notificações de casos, documentos e demais consumidores continuam pendentes. [Comandos e limites](../../docs/ACESSO.md).
