from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, serializers, viewsets

from algorithms.api.filters import AlgorithmFilter
from algorithms.api.serializers import AlgorithmDetailSerializer, AlgorithmListSerializer
from algorithms.models import Algorithm


class AlgorithmViewSet(viewsets.ReadOnlyModelViewSet[Algorithm]):
    queryset = Algorithm.objects.all()
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = [
        'name',
        'general_description',
        'input_description',
        'output_description',
        'code',
    ]
    filterset_class = AlgorithmFilter

    def get_serializer_class(self) -> type[serializers.ModelSerializer[Algorithm]]:
        if self.action == 'list':
            return AlgorithmListSerializer
        return AlgorithmDetailSerializer
