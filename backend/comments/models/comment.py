from django.conf import settings
from django.db import models
from django.db.models import Count, Exists, OuterRef

from algorithms.models import Algorithm
from core.models import TimeStampedModel
from users.models import User


class _CommentQuerySet(models.QuerySet['Comment']):
    def with_counts(self) -> _CommentQuerySet:
        return self.annotate(
            reply_count=Count('replies', distinct=True),
            like_count=Count('likes', distinct=True),
        )

    def with_user_likes(self, user: User) -> _CommentQuerySet:
        return self.annotate(
            liked_by_user=Exists(
                Comment.likes.through.objects.filter(
                    comment_id=OuterRef('pk'),
                    user_id=user.pk,
                )
            )
        )


class Comment(TimeStampedModel):
    body = models.TextField(max_length=1000)

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    algorithm = models.ForeignKey(Algorithm, on_delete=models.CASCADE, related_name='comments')
    reply_to = models.ForeignKey('self', blank=True, null=True, on_delete=models.CASCADE, related_name='replies')
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='liked_comments')

    objects = _CommentQuerySet.as_manager()

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return f'comment #{self.pk} ({self.algorithm}, {self.user}) - {self.body[:50]}'
