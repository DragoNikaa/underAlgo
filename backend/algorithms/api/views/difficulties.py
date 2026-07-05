from rest_framework import mixins, viewsets

from algorithms.api.serializers import DifficultySerializer
from algorithms.models import Difficulty


class DifficultyViewSet(mixins.ListModelMixin, viewsets.GenericViewSet[Difficulty]):
    queryset = Difficulty.objects.all()
    serializer_class = DifficultySerializer
