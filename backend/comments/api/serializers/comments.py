from django.contrib.auth import get_user_model
from rest_framework import serializers

from comments.models import Comment
from users.models import User

_User = get_user_model()


class _UserSerializer(serializers.ModelSerializer[User]):
    class Meta:
        model = _User
        fields = [
            'id',
            'username',
        ]


class CommentSerializer(serializers.ModelSerializer[Comment]):
    user = _UserSerializer(read_only=True)
    reply_count = serializers.IntegerField(read_only=True)
    like_count = serializers.IntegerField(read_only=True)
    liked_by_user = serializers.BooleanField(read_only=True)

    class Meta:
        model = Comment
        fields = [
            'id',
            'body',
            'user',
            'reply_count',
            'like_count',
            'liked_by_user',
            'created_at',
            'updated_at',
        ]
