from django.db.models import QuerySet
from django.shortcuts import get_object_or_404
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import BaseSerializer

from algorithms.models import Algorithm
from comments.api.serializers import CommentSerializer
from comments.models import Comment
from users.utils import get_authenticated_user


class CommentViewSet(viewsets.ModelViewSet[Comment]):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self) -> QuerySet[Comment]:
        queryset = Comment.objects.filter(algorithm=self._get_algorithm())

        if self.action == 'list':
            queryset = queryset.filter(reply_to__isnull=True)

        if self.request.user.is_authenticated:
            queryset = queryset.with_user_likes(self.request.user)

        return queryset.with_counts().order_by('-created_at')

    def perform_create(self, serializer: BaseSerializer[Comment]) -> None:
        serializer.save(
            user=self.request.user,
            algorithm=self._get_algorithm(),
        )

    @action(methods=['POST'], detail=True)
    def like(self, request: Request, algorithm_slug: str, pk: int | None = None) -> Response:
        comment = self.get_object()
        user = get_authenticated_user(request)
        comment.likes.add(user)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @like.mapping.delete
    def unlike(self, request: Request, algorithm_slug: str, pk: int | None = None) -> Response:
        comment = self.get_object()
        user = get_authenticated_user(request)
        comment.likes.remove(user)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def _get_algorithm(self) -> Algorithm:
        return get_object_or_404(
            Algorithm,
            slug=self.kwargs['algorithm_slug'],
        )
