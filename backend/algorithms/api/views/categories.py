from django.db.models import Count
from rest_framework import mixins, viewsets

from algorithms.api.serializers import CategorySerializer
from algorithms.models import Category


class CategoryViewSet(mixins.ListModelMixin, viewsets.GenericViewSet[Category]):
    queryset = (Category.objects
                .annotate(algorithm_count=Count('algorithms'))
                .order_by('-algorithm_count'))
    serializer_class = CategorySerializer
    pagination_class = None
