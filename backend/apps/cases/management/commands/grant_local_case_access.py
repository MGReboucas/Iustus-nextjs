from datetime import timedelta

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.utils import timezone

from apps.identity.models import User
from apps.identity.services import audit
from apps.cases.models import LocalCaseAccess


class Command(BaseCommand):
    help = "Libera submissão fictícia local por até 7 dias; nunca ativa assinatura."

    def add_arguments(self, parser):
        parser.add_argument("email")
        parser.add_argument("--days", type=int, default=1)
        parser.add_argument("--reason", required=True)

    def handle(self, *args, **options):
        if not settings.DEBUG or not settings.CASE_LOCAL_TEST_ACCESS:
            raise CommandError("Comando exclusivo de ambiente local com liberação de testes habilitada.")
        if not 1 <= options["days"] <= 7 or not 5 <= len(options["reason"].strip()) <= 240:
            raise CommandError("Informe 1 a 7 dias e motivo com 5 a 240 caracteres.")
        user = User.objects.filter(email=options["email"].strip().lower(), role="CLIENT", is_active=True, email_verified_at__isnull=False).first()
        if not user or not user.email.endswith("@example.test"):
            raise CommandError("Use cliente fictício verificado com endereço @example.test.")
        with transaction.atomic():
            LocalCaseAccess.objects.update_or_create(user=user, defaults={"expires_at": timezone.now() + timedelta(days=options["days"]), "reason": options["reason"].strip()})
            audit(user, "LOCAL_CASE_ACCESS_GRANTED", "client", days=options["days"], reason=options["reason"].strip())
        self.stdout.write("Submissão local de testes liberada; nenhuma assinatura ou cobrança foi criada.")
