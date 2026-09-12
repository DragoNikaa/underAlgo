from django.db.models import QuerySet
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.serializers import BaseSerializer

from algorithms.models import Algorithm
from comments.api.serializers import CommentSerializer
from comments.models import Comment


class CommentViewSet(viewsets.ModelViewSet[Comment]):
    serializer_class = CommentSerializer

    def get_queryset(self) -> QuerySet[Comment]:
        queryset = Comment.objects.filter(algorithm=self._get_algorithm())

        if self.action == 'list':
            queryset = queryset.filter(reply_to__isnull=True)

        return queryset.with_counts().order_by('-created_at')

    def perform_create(self, serializer: BaseSerializer[Comment]) -> None:
        serializer.save(
            user=self.request.user,
            algorithm=self._get_algorithm(),
        )

    def _get_algorithm(self) -> Algorithm:
        return get_object_or_404(
            Algorithm,
            slug=self.kwargs['algorithm_slug'],
        )
