__all__ = [
    'AlgorithmViewSet',
    'CategoryViewSet',
    'DifficultyViewSet',
]

from algorithms.api.views.algorithms import AlgorithmViewSet
from algorithms.api.views.categories import CategoryViewSet
from algorithms.api.views.difficulties import DifficultyViewSet
