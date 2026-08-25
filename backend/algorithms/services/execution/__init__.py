__all__ = [
    'ALGORITHMS',
    'BaseAlgorithm',
]

from algorithms.services.execution.base import BaseAlgorithm
from algorithms.services.execution.binary_search import BinarySearch

ALGORITHMS = {
    'binary-search': BinarySearch,
}
