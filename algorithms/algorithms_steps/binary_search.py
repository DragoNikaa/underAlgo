from typing import Any, Literal

from pydantic import BaseModel, field_validator


class BinarySearch:
    _VariableName = Literal["left", "right", "middle"]

    _LEFT: _VariableName = "left"
    _RIGHT: _VariableName = "right"
    _MIDDLE: _VariableName = "middle"

    _NUMBERS_STYLED = f"[[bold:numbers]]"
    _TARGET_STYLED = f"[[bold:target]]"
    _LEFT_STYLED = f"[[bold keyword-color:{_LEFT}]]"
    _RIGHT_STYLED = f"[[bold title-color:{_RIGHT}]]"
    _MIDDLE_STYLED = f"[[bold built-in-color:{_MIDDLE}]]"

    def __init__(self, numbers: list[int], target: int):
        self._numbers = numbers
        self._target = target

        self._steps: list[dict[str, Any]] = []
        self._left = self._right = self._middle = 0

        self._to_change: list[BinarySearch._VariableName] | None = None

    def get_steps(self) -> list[dict[str, Any]]:
        if not self._steps:
            self._run_algorithm_and_save_steps()
        return self._steps

    def _run_algorithm_and_save_steps(self) -> int:
        self._save_step(line=2, to_change=[self._LEFT],
                        explanation=f"We set {self._LEFT_STYLED} to the index of the first element in {self._NUMBERS_STYLED}.")
        self._left = 0  # 2

        self._save_step(line=3, to_change=[self._RIGHT],
                        explanation=f"We set {self._RIGHT_STYLED} to the index of the last element in {self._NUMBERS_STYLED}. We will search through the elements from {self._LEFT_STYLED} to {self._RIGHT_STYLED} (inclusive).")
        self._right = len(self._numbers) - 1  # 3

        while self._left <= self._right:  # 5
            self._save_step(line=5,
                            explanation=f"Since {self._LEFT_STYLED} is less than or equal to {self._RIGHT_STYLED}, we still have elements to search through.")

            self._save_step(line=6, to_change=[self._MIDDLE],
                            explanation=f"We calculate {self._MIDDLE_STYLED} as the index halfway between {self._LEFT_STYLED} and {self._RIGHT_STYLED}.")
            self._middle = (self._left + self._right) // 2  # 6

            if self._numbers[self._middle] == self._target:  # 8
                self._save_step(line=8,
                                explanation=f"The element at index {self._MIDDLE_STYLED} is equal to {self._TARGET_STYLED}, so the search is complete.")

                self._save_step(line=9, explanation=f"We return the index of the found element.")
                self._save_step(output=self._middle)
                return self._middle  # 9

            elif self._numbers[self._middle] < self._target:  # 10
                self._save_step(line=8,
                                explanation=f"The element at index {self._MIDDLE_STYLED} is not equal to {self._TARGET_STYLED}, so we move on.")
                self._save_step(line=10,
                                explanation=f"The element at index {self._MIDDLE_STYLED} is less than {self._TARGET_STYLED}. Since {self._NUMBERS_STYLED} are sorted in ascending order, we know that if {self._TARGET_STYLED} is present in {self._NUMBERS_STYLED}, it must be somewhere between {self._MIDDLE_STYLED} (exclusive) and {self._RIGHT_STYLED} (inclusive).")

                self._save_step(line=11, to_change=[self._LEFT],
                                explanation=f"We adjust {self._LEFT_STYLED} to narrow the search range accordingly.")
                self._left = self._middle + 1  # 11

            else:  # 12
                self._save_step(line=8,
                                explanation=f"The element at index {self._MIDDLE_STYLED} is not equal to {self._TARGET_STYLED}, so we move on.")
                self._save_step(line=10,
                                explanation=f"The element at index {self._MIDDLE_STYLED} is not less than {self._TARGET_STYLED}, so we move on.")
                self._save_step(line=12,
                                explanation=f"The element at index {self._MIDDLE_STYLED} is greater than {self._TARGET_STYLED}. Since {self._NUMBERS_STYLED} are sorted in ascending order, we know that if {self._TARGET_STYLED} is present in {self._NUMBERS_STYLED}, it must be somewhere between {self._LEFT_STYLED} (inclusive) and {self._MIDDLE_STYLED} (exclusive).")

                self._save_step(line=13, to_change=[self._RIGHT],
                                explanation=f"We adjust {self._RIGHT_STYLED} to narrow the search range accordingly.")
                self._right = self._middle - 1  # 13

        self._save_step(line=5,
                        explanation=f"Since {self._LEFT_STYLED} is greater than {self._RIGHT_STYLED}, we have checked all possible elements without finding {self._TARGET_STYLED}.")

        self._save_step(line=15,
                        explanation=f"Since {self._TARGET_STYLED} is not present in {self._NUMBERS_STYLED}, we indicate an unsuccessful search.")
        self._save_step(output=-1)
        return -1  # 15

    def _save_step(self, *, line: int | None = None, to_change: list[_VariableName] | None = None,
                   explanation: str | None = None, output: int | None = None) -> None:
        self._steps.append(
            {"line": line, "variables": {"changed": self._get_changed_variables(), "to_change": to_change},
             "explanation": explanation, "output": output})
        self._to_change = to_change

    def _get_changed_variables(self) -> dict[_VariableName, int] | None:
        if self._to_change:
            return {variable_name: self._get_variable_value(variable_name) for variable_name in self._to_change}
        return None

    def _get_variable_value(self, variable_name: _VariableName) -> int:
        name_to_value = {
            self._LEFT: self._left,
            self._RIGHT: self._right,
            self._MIDDLE: self._middle,
        }
        return name_to_value[variable_name]


class BinarySearchInput(BaseModel):
    numbers: list[int]
    target: int

    @field_validator("numbers")
    @classmethod
    def numbers_cannot_be_empty(cls, numbers: list[int]) -> list[int]:
        if not numbers:
            raise ValueError("Input should be a list with at least one element")
        return numbers

    @field_validator("numbers")
    @classmethod
    def numbers_must_be_sorted(cls, numbers: list[int]) -> list[int]:
        if numbers != sorted(numbers):
            raise ValueError("Input should be a sorted list")
        return numbers
