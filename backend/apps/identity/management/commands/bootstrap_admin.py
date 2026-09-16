from getpass import getpass

from django.core.management.base import BaseCommand, CommandError
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.db import connection, transaction
from django.utils import timezone

from apps.identity.models import User
from apps.identity.services import audit, validate_new_password


class Command(BaseCommand):
    help = "Cria o primeiro administrador por console; MFA continua obrigatório no primeiro acesso."

    def add_arguments(self, parser):
        parser.add_argument("email")
        parser.add_argument("--name", required=True)

    def handle(self, *args, **options):
        email = options["email"].strip().lower()
        try:
            validate_email(email)
        except ValidationError as exc:
            raise CommandError("E-mail inválido.") from exc
        if User.objects.filter(role=User.Role.ADMIN).exists():
            raise CommandError("Já existe administrador. Não usar bootstrap para conceder novos privilégios.")
        if User.objects.filter(email__iexact=email).exists():
            raise CommandError("Este endereço já possui conta; nenhuma conta foi alterada.")
        password = getpass("Senha inicial (não será exibida): ")
        if password != getpass("Confirme a senha: "):
            raise CommandError("Senhas diferentes.")
        user = User(email=email, first_name=options["name"], role=User.Role.ADMIN, email_verified_at=timezone.now())
        validate_new_password(password, user)
        user.set_password(password)
        with transaction.atomic():
            if connection.vendor == "postgresql":
                with connection.cursor() as cursor:
                    cursor.execute("SELECT pg_advisory_xact_lock(%s)", [73145001])
            if User.objects.filter(role=User.Role.ADMIN).exists():
                raise CommandError("Já existe administrador. Nenhum privilégio adicional concedido.")
            user.save()
            audit(user, "ADMIN_BOOTSTRAPPED", "team")
        self.stdout.write(self.style.SUCCESS("Administrador criado. Configure MFA no portal profissional."))
