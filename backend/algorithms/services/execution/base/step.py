from typing import Any, TypedDict


class Step(TypedDict):
    line: int
    explanation: str
    variables: dict[str, Any]
