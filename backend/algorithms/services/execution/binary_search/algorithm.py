from typing import Any

from algorithms.services.execution.base import BaseAlgorithm, Variable
from algorithms.services.execution.binary_search.input import BinarySearchInput


class BinarySearch(BaseAlgorithm[int]):
    _Input = BinarySearchInput

    def __init__(self, input_data: Any):
        super().__init__(input_data)

        self._numbers = Variable[list[int]]('numbers', self._test_case['numbers'])
        self._target = Variable[int]('target', self._test_case['target'])

        self._left = Variable('left', 0, self._update_last_step_variable)
        self._right = Variable('right', 0, self._update_last_step_variable)
        self._middle = Variable('middle', 0, self._update_last_step_variable)

    def _execute_and_save_steps(self) -> int:
        self._save_step(
            2,
            f'We set {self._left} to the index of the first element in {self._numbers}.'
        )
        self._left.value = 0  # line 2

        self._save_step(
            3,
            f'We set {self._right} to the index of the last element in {self._numbers}. '
            f'The current search range includes all elements from {self._left} to {self._right} (inclusive).'
        )
        self._right.value = len(self._numbers.value) - 1  # line 3

        while self._left.value <= self._right.value:  # line 5
            self._save_step(
                5,
                f'Since {self._left} is less than or equal to {self._right}, '
                f'the current search range is not empty, so we continue searching.'
            )

            self._save_step(
                6,
                f'We calculate {self._middle} as the index halfway between {self._left} and {self._right}.'
            )
            self._middle.value = (self._left.value + self._right.value) // 2  # line 6

            if self._numbers.value[self._middle.value] == self._target.value:  # line 8
                self._save_step(
                    8,
                    f'The element at index {self._middle} is equal to {self._target}, '
                    f'so we have found the element we were looking for.'
                )

                self._save_step(
                    9,
                    f'We return the index of the found element.'
                )
                return self._middle.value  # line 9

            elif self._numbers.value[self._middle.value] < self._target.value:  # line 10
                self._save_step(
                    8,
                    f'The element at index {self._middle} is not equal to {self._target}, so we continue the search.'
                )
                self._save_step(
                    10,
                    f'The element at index {self._middle} is less than {self._target}. '
                    f'Since {self._numbers} are sorted in non-decreasing order, if {self._target} is present, '
                    f'it must be between {self._middle} (exclusive) and {self._right} (inclusive).'
                )

                self._save_step(
                    11,
                    f'We update {self._left} to exclude the left half of the current search range.'
                )
                self._left.value = self._middle.value + 1  # line 11

            else:  # line 12
                self._save_step(
                    8,
                    f'The element at index {self._middle} is not equal to {self._target}, so we continue the search.'
                )
                self._save_step(
                    10,
                    f'The element at index {self._middle} is not less than {self._target}, '
                    f'so we move on to the remaining case.'
                )
                self._save_step(
                    12,
                    f'The element at index {self._middle} is greater than {self._target}. '
                    f'Since {self._numbers} are sorted in non-decreasing order, if {self._target} is present, '
                    f'it must be between {self._left} (inclusive) and {self._middle} (exclusive).'
                )

                self._save_step(
                    13,
                    f'We update {self._right} to exclude the right half of the current search range.'
                )
                self._right.value = self._middle.value - 1  # line 13

        self._save_step(
            5,
            f'Since {self._left} is greater than {self._right}, the search range is empty. '
            f'We have checked every possible location where {self._target} could appear.'
        )

        self._save_step(
            15,
            f'{self._target} is not present in {self._numbers}, so we indicate that the search was unsuccessful.'

        )
        return -1  # line 15
