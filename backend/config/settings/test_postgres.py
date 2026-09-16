"""Testes de integração em banco separado, sem tocar no banco de desenvolvimento."""
from .test import *  # noqa: F403
from .base import BASE_DIR, env

env.read_env(BASE_DIR / ".env")
DATABASES = {"default": env.db("TEST_DATABASE_URL", default=env("DATABASE_URL"))}
