"""Testes unitários da fundação, sem .env, rede ou banco de desenvolvimento."""
from .base import *  # noqa: F403

SECRET_KEY = "test-only-not-a-deployment-secret"
ALLOWED_HOSTS = ["testserver", "localhost"]
DATABASES = {"default": {"ENGINE": "django.db.backends.sqlite3", "NAME": ":memory:"}}
EMAIL_BACKEND = "django.core.mail.backends.locmem.EmailBackend"
PASSWORD_HASHERS = ["django.contrib.auth.hashers.MD5PasswordHasher"]
