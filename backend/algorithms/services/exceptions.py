from typing import Any


class InputValidationError(Exception):
    def __init__(self, errors: list[dict[str, Any]]):
        super().__init__('Input validation failed.')
        self.errors = errors
