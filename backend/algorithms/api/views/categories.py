from rest_framework import mixins, viewsets

from algorithms.api.serializers import CategorySerializer
from algorithms.models import Category


class CategoryViewSet(mixins.ListModelMixin, viewsets.GenericViewSet[Category]):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
