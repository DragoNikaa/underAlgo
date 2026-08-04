from typing import Any

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, serializers, viewsets
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response

from algorithms.api.filters import AlgorithmFilter
from algorithms.api.serializers import AlgorithmDetailSerializer, AlgorithmListSerializer, TestCaseSerializer
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

    def get_serializer_class(self) -> type[serializers.ModelSerializer[Any]]:
        if self.action == 'list':
            return AlgorithmListSerializer
        if self.action == 'retrieve':
            return AlgorithmDetailSerializer
        return TestCaseSerializer

    @action(methods=['POST'], detail=True)
    def execute(self, request: Request, slug: str) -> Response:
        algorithm = self.get_object()

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        test_case = serializer.validated_data['body']

        return Response({
            'algorithm': algorithm.name,
            'test_case': test_case,
        })
