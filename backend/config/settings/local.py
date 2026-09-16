"""Desenvolvimento em loopback; não usar este módulo em produção."""
from django.core.management.utils import get_random_secret_key

from .base import *  # noqa: F403
from .base import BASE_DIR, env

env.read_env(BASE_DIR / ".env")
SECRET_KEY = env("DJANGO_SECRET_KEY", default="") or get_random_secret_key()
DEBUG = True
ALLOWED_HOSTS = ["localhost", "127.0.0.1", "[::1]"]
DATABASES = {
    "default": env.db(
        default="postgresql://iustus:iustus-local-only@127.0.0.1:5432/iustus"
    )
}
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
# HTTP de desenvolvimento: não usar prefixo __Host- sem HTTPS.
SESSION_COOKIE_NAME = "iustus_local_session"
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False
