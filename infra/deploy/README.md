# Implantação planejada

Frontend Next.js, API Django e worker Python terão processos e verificações de saúde próprios, usando o mesmo repositório. API e worker compartilham artefato Python e regras de domínio; só Django executa migrações.

Antes de gerar manifests produtivos: escolher provedor e versões suportadas, implementar sessões por portal/MFA e outbox, definir segredos e armazenamento privado, validar contrato, backups e reversão. O scaffold atual disponibiliza somente a fundação local e liveness da API. Roteiro completo em [Operação](../../docs/OPERACAO.md).
