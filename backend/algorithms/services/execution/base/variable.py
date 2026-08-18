from typing import Any, Callable, Generic, TypeVar

T = TypeVar('T')


class Variable(Generic[T]):
    def __init__(self, name: str, value: T, on_change: Callable[[Variable[Any]], None] | None = None):
        self._name = name
        self._value = value
        self._on_change = on_change

    @property
    def name(self) -> str:
        return self._name

    @property
    def value(self) -> T:
        return self._value

    @value.setter
    def value(self, value: T) -> None:
        self._value = value
        if self._on_change:
            self._on_change(self)

    def __str__(self) -> str:
        return f'[[{self._name}]]'
