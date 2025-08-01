from typing import Any, Literal

from pydantic import BaseModel, field_validator


class BinarySearch:
    _VariableName = Literal["left", "right", "middle"]

    _LEFT: _VariableName = "left"
    _RIGHT: _VariableName = "right"
    _MIDDLE: _VariableName = "middle"

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
        self._save_step(line=2, to_change=[self._LEFT])
        self._left = 0  # 2

        self._save_step(line=3, to_change=[self._RIGHT])
        self._right = len(self._numbers) - 1  # 3

        while self._left <= self._right:  # 5
            self._save_step(line=5)

            self._save_step(line=6, to_change=[self._MIDDLE])
            self._middle = (self._left + self._right) // 2  # 6

            if self._numbers[self._middle] == self._target:  # 8
                self._save_step(line=8)

                self._save_step(line=9)
                self._save_step(output=self._middle)
                return self._middle  # 9

            elif self._numbers[self._middle] < self._target:  # 10
                for line in (8, 10):
                    self._save_step(line=line)

                self._save_step(line=11, to_change=[self._LEFT])
                self._left = self._middle + 1  # 11

            else:  # 12
                for line in (8, 10, 12):
                    self._save_step(line=line)

                self._save_step(line=13, to_change=[self._RIGHT])
                self._right = self._middle - 1  # 13

        self._save_step(line=5)

        self._save_step(line=15)
        self._save_step(output=-1)
        return -1  # 15

    def _save_step(self, *, line: int | None = None, to_change: list[_VariableName] | None = None,
                   message: str | None = None, output: int | None = None) -> None:
        self._steps.append(
            {"line": line, "variables": {"changed": self._get_changed_variables(), "to_change": to_change},
             "message": message, "output": output})
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
