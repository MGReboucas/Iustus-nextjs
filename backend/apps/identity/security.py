import hashlib
import secrets
from datetime import timedelta

from cryptography.fernet import Fernet
from django.conf import settings
from django.db import transaction
from django.utils import timezone
from rest_framework.exceptions import APIException

from .models import RateLimitBucket


class IdentityError(APIException):
    def __init__(self, code, message, status=400):
        self.status_code = status
        self.identity_code = code
        super().__init__(message)


def digest(value):
    return hashlib.sha256(value.encode()).hexdigest()


def encrypt(value):
    return Fernet(settings.IDENTITY_ENCRYPTION_KEY.encode()).encrypt(value.encode()).decode()


def decrypt(value):
    return Fernet(settings.IDENTITY_ENCRYPTION_KEY.encode()).decrypt(value.encode()).decode()


def throttle(scope, identity, limit, seconds=300):
    """Contador PostgreSQL compartilhado entre processos, sem guardar IP/e-mail cru."""
    if not settings.IDENTITY_RATE_LIMITS_ENABLED:
        return
    now = timezone.now()
    window = int(now.timestamp()) // seconds
    key = digest(f"{scope}:{identity}:{window}")
    with transaction.atomic():
        RateLimitBucket.objects.get_or_create(
            key=key, defaults={"expires_at": now + timedelta(seconds=seconds * 2)}
        )
        bucket = RateLimitBucket.objects.select_for_update().get(pk=key)
        allowed = bucket.attempts < limit
        bucket.attempts += 1
        bucket.save(update_fields=["attempts"])
    if not allowed:
        raise IdentityError("RATE_LIMITED", "Muitas tentativas. Aguarde alguns minutos.", 429)


def recovery_codes():
    codes = [secrets.token_hex(16) for _ in range(8)]
    return codes, [digest(code) for code in codes]
