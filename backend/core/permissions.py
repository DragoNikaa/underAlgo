from typing import Protocol

from rest_framework import permissions
from rest_framework.request import Request
from rest_framework.views import APIView

from users.models import User


class _HasUser(Protocol):
    user: User


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request: Request, view: APIView, obj: _HasUser) -> bool:
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.user == request.user
