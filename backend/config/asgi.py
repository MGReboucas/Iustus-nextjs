"""A implantação deve informar DJANGO_SETTINGS_MODULE explicitamente."""
from django.core.asgi import get_asgi_application

application = get_asgi_application()
