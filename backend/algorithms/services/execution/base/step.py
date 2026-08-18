from typing import Any, TypedDict


class Step(TypedDict):
    line: int
    explanation: str
    changed_variables: set[str]
    variables: dict[str, Any]
