from django.db.models import Count
from rest_framework import mixins, viewsets

from algorithms.api.serializers import DifficultySerializer
from algorithms.models import Difficulty


class DifficultyViewSet(mixins.ListModelMixin, viewsets.GenericViewSet[Difficulty]):
    queryset = (Difficulty.objects
                .annotate(algorithm_count=Count('algorithms'))
                .order_by('id'))
    serializer_class = DifficultySerializer
    pagination_class = None
