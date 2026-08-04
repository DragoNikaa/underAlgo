from typing import Any

from rest_framework import serializers
from rest_framework.reverse import reverse

from algorithms.models import Algorithm
from .categories import CategorySerializer
from .difficulties import DifficultySerializer
from .test_cases import TestCaseSerializer


class _AlgorithmSerializer(serializers.ModelSerializer[Algorithm]):
    difficulty = DifficultySerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)


class AlgorithmListSerializer(_AlgorithmSerializer):
    links = serializers.SerializerMethodField()

    class Meta:
        model = Algorithm
        fields = [
            'links',
            'name',
            'slug',
            'general_description',
            'difficulty',
            'categories',
        ]

    def get_links(self, instance: Algorithm) -> dict[str, str]:
        return {
            'self': reverse(
                'algorithm-detail',
                kwargs={'slug': instance.slug},
                request=self.context['request'],
            ),
        }


class AlgorithmDetailSerializer(_AlgorithmSerializer):
    actions = serializers.SerializerMethodField()
    test_cases = TestCaseSerializer(many=True, read_only=True)

    class Meta:
        model = Algorithm
        fields = [
            'actions',
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

    def get_actions(self, instance: Algorithm) -> dict[str, dict[str, Any]]:
        return {
            'execute': {
                'href': reverse(
                    'algorithm-execute',
                    kwargs={'slug': instance.slug},
                    request=self.context['request'],
                ),
                'method': 'POST',
                'fields': list(instance.input_description),
            },
        }
