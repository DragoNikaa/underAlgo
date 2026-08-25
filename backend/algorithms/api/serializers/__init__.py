__all__ = [
    'INPUT_SERIALIZERS',
    'AlgorithmDetailSerializer', 'AlgorithmListSerializer',
    'CategorySerializer',
    'DifficultySerializer',
    'TestCaseSerializer',
]

from algorithms.api.serializers.algorithms import AlgorithmDetailSerializer, AlgorithmListSerializer
from algorithms.api.serializers.categories import CategorySerializer
from algorithms.api.serializers.difficulties import DifficultySerializer
from algorithms.api.serializers.inputs import BinarySearchInputSerializer
from algorithms.api.serializers.test_cases import TestCaseSerializer

INPUT_SERIALIZERS = {
    'binary-search': BinarySearchInputSerializer,
}
