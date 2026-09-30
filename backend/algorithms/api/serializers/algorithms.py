from rest_framework import serializers

from algorithms.api.serializers.categories import CategorySerializer
from algorithms.api.serializers.difficulties import DifficultySerializer
from algorithms.api.serializers.test_cases import TestCaseSerializer
from algorithms.models import Algorithm


class _AlgorithmSerializer(serializers.ModelSerializer[Algorithm]):
    difficulty = DifficultySerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)


class AlgorithmListSerializer(_AlgorithmSerializer):
    class Meta:
        model = Algorithm
        fields = [
            'name',
            'slug',
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
            'slug',
            'general_description',
            'input_description',
            'output_description',
            'code',
            'difficulty',
            'categories',
            'test_cases',
        ]
