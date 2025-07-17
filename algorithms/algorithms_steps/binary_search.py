from typing import Any


class BinarySearch:
    def __init__(self, numbers: list[int], target: int):
        self._numbers = numbers
        self._target = target

        self._steps: list[dict[str, Any]] = []
        self._left: int | None = None
        self._right: int | None = None
        self._middle: int | None = None

    def get_steps(self) -> list[dict[str, Any]]:
        if not self._steps:
            self._run_algorithm_and_save_steps()
        return self._steps

    def _run_algorithm_and_save_steps(self) -> int:
        self._left = 0  # 2
        self._save_step(2)

        self._right = len(self._numbers) - 1  # 3
        self._save_step(3)

        while self._left <= self._right:  # 5
            self._save_step(5)

            self._middle = (self._left + self._right) // 2  # 6
            self._save_step(6)

            if self._numbers[self._middle] == self._target:  # 8
                self._save_step(8)

                self._save_step(9, result=self._middle)
                return self._middle  # 9

            elif self._numbers[self._middle] < self._target:  # 10
                for line in (8, 10):
                    self._save_step(line)

                self._left = self._middle + 1  # 11
                self._save_step(11)

            else:  # 12
                for line in (8, 10, 12):
                    self._save_step(line)

                self._right = self._middle - 1  # 13
                self._save_step(13)

        self._save_step(5)

        self._save_step(15, result=-1)
        return -1  # 15

    def _save_step(self, line: int, **kwargs: Any) -> None:
        self._steps.append({"line": line, "variables": self._defined_variables, **kwargs})

    @property
    def _defined_variables(self) -> dict[str, Any]:
        return {name: value for name, value in self._declared_variables.items() if value is not None}

    @property
    def _declared_variables(self) -> dict[str, Any]:
        return {"left": self._left, "right": self._right, "middle": self._middle}
