from abc import ABC, abstractmethod
from typing import Any, Generic, TypeVar

from algorithms.services.execution.base.step import Step
from algorithms.services.execution.base.variable import Variable

T = TypeVar('T')


class BaseAlgorithm(ABC, Generic[T]):
    def __init__(self, **kwargs: Any):
        self._variables: set[Variable[Any]] = set()
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
            'changed_variables': set(),
            'variables': {variable.name: variable.value for variable in self._variables},
        })

    def _save_variable_update(self, variable: Variable[Any]) -> None:
        self._variables.add(variable)
        if self._steps:
            self._steps[-1]['changed_variables'].add(variable.name)
