import time

from django.core.management.base import BaseCommand

from jobs.mail import deliver_one


class Command(BaseCommand):
    help = "Entrega a fila de e-mails de identidade. Settings local grava arquivos, sem enviar mensagens externas."

    def add_arguments(self, parser):
        parser.add_argument("--once", action="store_true", help="Processa os itens disponíveis e encerra.")

    def handle(self, *args, **options):
        try:
            while True:
                if not deliver_one():
                    if options["once"]:
                        break
                    time.sleep(2)
        except KeyboardInterrupt:
            self.stdout.write("Worker encerrado.")
