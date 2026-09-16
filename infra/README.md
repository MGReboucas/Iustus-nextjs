# Infraestrutura

Configurações operacionais do mesmo repositório; sem deploy, domínio ou recurso externo criado.

## PostgreSQL nativo do projeto

O [guia de acesso](../docs/ACESSO.md) usa setup_local.py para iniciar um cluster isolado em .local/postgres, porta 55432, com credenciais aleatórias ignoradas pelo Git. O serviço PostgreSQL preexistente é preservado.

## PostgreSQL via Docker (alternativa)

Com Docker e Compose instalados, executar na raiz:

```bash
docker compose -f infra/compose.local.yaml up -d postgres
docker compose -f infra/compose.local.yaml ps
docker compose -f infra/compose.local.yaml stop
```

O banco fica em `127.0.0.1:5432`; usuário/banco `iustus`, senha exclusivamente local `iustus-local-only`. Os dados ficam no volume nomeado. A configuração é compatível com `backend/.env.example`. Não usar em produção nem remover o volume para reiniciar o serviço.

## Implantação futura

`proxy/` contém as decisões da entrada HTTPS; `deploy/` concentra o roteiro para frontend, API e worker. A escolha de provedor, TLS, objetos, scanner, backups e segredos permanece pendente. A configuração produtiva será criada após homologação dos controles de acesso locais e definição dos controles de operação.
