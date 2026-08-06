from abc import ABC, abstractmethod
from typing import Any, Generic, TypeVar

from pydantic import BaseModel, ValidationError

from algorithms.services.exceptions import InputValidationError
from algorithms.services.execution.base.step import Step

T = TypeVar('T')


class BaseAlgorithm(ABC, Generic[T]):
    _Input: type[BaseModel]

    def __init__(self, input_data: Any):
        self._test_case = self._validate_input(input_data)
        self._steps: list[Step] = []
        self._output: T | None = None

    @property
    def steps(self) -> list[Step]:
        if not self._steps:
            self._output = self._execute_and_save_steps()
        return self._steps

    @property
    def output(self) -> T:
        if not self._output:
            self._output = self._execute_and_save_steps()
        return self._output

    @abstractmethod
    def _execute_and_save_steps(self) -> T:
        ...

    @classmethod
    def _validate_input(cls, data: Any) -> dict[str, Any]:
        try:
            return cls._Input(**data).model_dump()
        except ValidationError as error:
            raise InputValidationError(cls._format_validation_errors(error))

    @staticmethod
    def _format_validation_errors(error: ValidationError) -> list[dict[str, Any]]:
        return [
            {
                'field': details['loc'][0],
                'message': details['msg'].removeprefix('Value error, ') + '.',
            }
            for details in error.errors()
        ]

    def _save_step(self, line: int, explanation: str) -> None:
        self._steps.append({
            'line': line,
            'explanation': explanation,
            'variables': {},
        })

    def _update_last_step_variable(self, name: str, value: Any) -> None:
        if self._steps:
            self._steps[-1]['variables'][name] = value
