from abc import ABC, abstractmethod
from typing import Any, Generic, TypeVar

from algorithms.services.execution.base.step import Step

T = TypeVar('T')


class BaseAlgorithm(ABC, Generic[T]):
    def __init__(self, **kwargs: Any):
        self._steps: list[Step] = []
        self._output: T = self._execute_and_save_steps()

    @property
    def steps(self) -> list[Step]:
        return self._steps

    @property
    def output(self) -> T:
        return self._output

    @abstractmethod
    def _execute_and_save_steps(self) -> T:
        ...

    def _save_step(self, line: int, explanation: str) -> None:
        self._steps.append({
            'line': line,
            'explanation': explanation,
            'variables': {},
        })

    def _update_last_step_variable(self, name: str, value: Any) -> None:
        if self._steps:
            self._steps[-1]['variables'][name] = value
