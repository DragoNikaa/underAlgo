from typing import Any

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, serializers, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework.request import Request
from rest_framework.response import Response

from algorithms.api.filters import AlgorithmFilter
from algorithms.api.serializers import AlgorithmDetailSerializer, AlgorithmListSerializer, TestCaseSerializer
from algorithms.models import Algorithm
from algorithms.services.exceptions import InputValidationError
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

    def get_serializer_class(self) -> type[serializers.ModelSerializer[Any]]:
        if self.action == 'list':
            return AlgorithmListSerializer
        if self.action == 'retrieve':
            return AlgorithmDetailSerializer
        return TestCaseSerializer

    @action(methods=['POST'], detail=True)
    def execute(self, request: Request, slug: str) -> Response:
        algorithm_class = self._get_algorithm_class(slug)

        try:
            algorithm = algorithm_class(self._get_input(request))
        except InputValidationError as error:
            return Response({'errors': error.errors}, status=422)

        return Response({
            'steps': algorithm.steps,
            'output': algorithm.output,
        })

    @staticmethod
    def _get_algorithm_class(slug: str) -> type[BaseAlgorithm[Any]]:
        try:
            return ALGORITHMS[slug]
        except KeyError:
            raise NotFound('No Algorithm matches the given query.')

    def _get_input(self, request: Request) -> Any:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return serializer.validated_data['body']
