from django.middleware.csrf import get_token
from rest_framework import views

from rest_framework.request import Request
from rest_framework.response import Response


class CSRFView(views.APIView):
    @staticmethod
    def get(request: Request) -> Response:
        return Response({'csrf_token': get_token(request)})
