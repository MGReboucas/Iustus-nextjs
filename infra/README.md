# Infraestrutura

Configurações operacionais do mesmo repositório; sem deploy, domínio ou recurso externo criado.

## PostgreSQL local opcional

Com Docker e Compose instalados, executar na raiz:

```bash
docker compose -f infra/compose.local.yaml up -d postgres
docker compose -f infra/compose.local.yaml ps
docker compose -f infra/compose.local.yaml stop
```

O banco fica em `127.0.0.1:5432`; usuário/banco `iustus`, senha exclusivamente local `iustus-local-only`. Os dados ficam no volume nomeado. A configuração é compatível com `backend/.env.example`. Não usar em produção nem remover o volume para reiniciar o serviço.

## Implantação futura

`proxy/` contém as decisões da entrada HTTPS; `deploy/` concentra o roteiro para frontend, API e worker. A escolha de provedor, TLS, objetos, scanner, backups e segredos permanece pendente. A configuração produtiva será criada após implementação do isolamento de portais, autenticação e controles de operação.
