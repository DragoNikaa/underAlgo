from django.db.models import QuerySet
from django.shortcuts import get_object_or_404
from rest_framework.serializers import BaseSerializer

from comments.api.views import CommentViewSet
from comments.models import Comment


class ReplyViewSet(CommentViewSet):
    def get_queryset(self) -> QuerySet[Comment]:
        queryset = Comment.objects.filter(reply_to=self._get_parent())

        if self.request.user.is_authenticated:
            queryset = queryset.with_user_likes(self.request.user)

        return queryset.with_counts().order_by('created_at')

    def perform_create(self, serializer: BaseSerializer[Comment]) -> None:
        parent = self._get_parent()

        serializer.save(
            user=self.request.user,
            algorithm=parent.algorithm,
            reply_to=parent,
        )

    def _get_parent(self) -> Comment:
        return get_object_or_404(
            Comment,
            pk=self.kwargs['comment_pk'],
            algorithm=self._get_algorithm(),
        )
