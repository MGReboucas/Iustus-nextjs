from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(["GET"])
@authentication_classes([])
@permission_classes([AllowAny])
def health(request):
    """Liveness apenas: não comprova banco, jobs ou prontidão para produção."""
    return Response({"status": "ok"}, headers={"Cache-Control": "no-store"})
