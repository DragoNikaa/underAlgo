from rest_framework.exceptions import NotAuthenticated
from rest_framework.request import Request

from users.models import User


def get_authenticated_user(request: Request) -> User:
    if not request.user.is_authenticated:
        raise NotAuthenticated()

    return request.user
