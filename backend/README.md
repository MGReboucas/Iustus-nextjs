# Backend Iustus

Fundação Django + Django REST Framework, organizada por domínio. Inclui usuário customizado UUID/e-mail, migração inicial, configuração PostgreSQL local e GET `/api/v1/health/`. O endpoint confirma apenas que o processo responde; não testa banco nem worker.

Cadastro/login públicos, MFA, sessões vinculadas ao portal, casos, pagamentos, arquivos e consumidores da outbox ainda não estão implementados. O Django Admin e as rotas de login do DRF não estão publicados. Os diretórios dos demais módulos são estrutura inicial, sem CRUD genérico exposto.

## Preparar no Windows

Com Python 3.12–3.14 instalado, a partir desta pasta:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.lock
Copy-Item .env.example .env
.\.venv\Scripts\python.exe manage.py check
.\.venv\Scripts\python.exe manage.py test --settings=config.settings.test
```

Se o alias `python` abrir a Microsoft Store, usar o caminho da instalação Python no primeiro comando. Não é necessário ativar a venv no PowerShell. No macOS/Linux, usar `python3` e `.venv/bin/python`.

`requirements.lock` fixa as dependências de execução verificadas nesta base; `pyproject.toml` declara os intervalos permitidos. Para instalação editável, usar `python -m pip install -e . -c requirements.lock`. Atualizar o lock conscientemente após validar compatibilidade.

## Executar localmente

Iniciar PostgreSQL pelo [Compose local](../infra/README.md), ou configurar um PostgreSQL próprio em `DATABASE_URL`. Depois, nesta pasta:

```powershell
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000
```

Acessar `http://127.0.0.1:8000/api/v1/health/`. A criação do banco PostgreSQL depende de serviço local disponível; esta organização não executa migrações em bancos externos.

Os testes usam SQLite em memória, isolado do `.env`; não homologam constraints, concorrência ou transações específicas de PostgreSQL. O usuário customizado foi definido antes da primeira migração para evitar substituir o modelo padrão depois que existirem dados.

## Configuração e limites

`local.py` aceita somente hosts de loopback e habilita DEBUG, e-mail no console e cookies HTTP para desenvolvimento. Sem `DJANGO_SECRET_KEY`, gera uma chave efêmera; configure uma chave local persistente para manter sessões entre reinícios. `test.py` nunca carrega `.env` e usa senha de teste com hash rápido somente na suíte isolada.

Não há settings de produção homologados. WSGI/ASGI exigem `DJANGO_SETTINGS_MODULE` explícito; não usam desenvolvimento como fallback. Produção depende dos controles registrados em [Segurança](../docs/SEGURANCA.md) e [Operação](../docs/OPERACAO.md).
