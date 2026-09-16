# Worker Python

O worker pertence ao backend e usará os mesmos modelos, configurações e serviços Django em processo separado. A outbox PostgreSQL, os leases, retries, deduplicação e consumidores ainda serão implementados em DEV-022/032 e nas tarefas de integração.

Esta pasta cria a fronteira de código; ainda não existe comando para iniciar um worker funcional. Não iniciar um processo ocioso nem informar jobs como concluídos sem executar o efeito correspondente. Não usar tarefas em memória dentro de requisições como substituto da outbox.
