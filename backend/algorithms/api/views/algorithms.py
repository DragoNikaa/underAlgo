from typing import Any

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, serializers, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework.request import Request
from rest_framework.response import Response

from algorithms.api.filters import AlgorithmFilter
from algorithms.api.serializers import AlgorithmDetailSerializer, AlgorithmListSerializer, INPUT_SERIALIZERS
from algorithms.models import Algorithm
from algorithms.services.execution import ALGORITHMS, BaseAlgorithm


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

    def get_serializer_class(self) -> type[serializers.Serializer[Any]]:
        if self.action == 'list':
            return AlgorithmListSerializer
        if self.action == 'retrieve':
            return AlgorithmDetailSerializer
        if self.action == 'execute':
            return self._get_by_slug(INPUT_SERIALIZERS)

        raise NotFound('Unsupported action.')

    @action(methods=['POST'], detail=True)
    def execute(self, request: Request, slug: str) -> Response:
        algorithm = self._get_algorithm(request)

        return Response({
            'input': algorithm.input,
            'steps': algorithm.steps,
            'output': algorithm.output,
        })

    def _get_algorithm(self, request: Request) -> BaseAlgorithm[Any]:
        algorithm = self._get_by_slug(ALGORITHMS)
        test_case = self._get_test_case(request)
        return algorithm(**test_case)

    def _get_test_case(self, request: Request) -> Any:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return serializer.validated_data

    def _get_by_slug[T](self, mapping: dict[str, T]) -> T:
        try:
            return mapping[self.kwargs['slug']]
        except KeyError:
            raise NotFound('No Algorithm matches the given query.')
