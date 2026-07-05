from rest_framework import serializers

from algorithms.models import Algorithm
from .categories import CategorySerializer
from .difficulties import DifficultySerializer
from .test_cases import TestCaseSerializer


class _AlgorithmSerializer(serializers.ModelSerializer[Algorithm]):
    difficulty = DifficultySerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)


class AlgorithmListSerializer(_AlgorithmSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='algorithm-detail', lookup_field='slug')

    class Meta:
        model = Algorithm
        fields = [
            'url',
            'name',
            'general_description',
            'difficulty',
            'categories',
        ]


class AlgorithmDetailSerializer(_AlgorithmSerializer):
    test_cases = TestCaseSerializer(many=True, read_only=True)

    class Meta:
        model = Algorithm
        fields = [
            'name',
            'general_description',
            'input_description',
            'output_description',
            'code',
            'difficulty',
            'categories',
            'test_cases',
        ]
