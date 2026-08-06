from pydantic import BaseModel, field_validator


class BinarySearchInput(BaseModel):
    numbers: list[int]
    target: int

    @field_validator('numbers')
    @classmethod
    def numbers_cannot_be_empty(cls, numbers: list[int]) -> list[int]:
        if not numbers:
            raise ValueError('Input should be a non-empty list')
        return numbers

    @field_validator('numbers')
    @classmethod
    def numbers_must_be_sorted(cls, numbers: list[int]) -> list[int]:
        if numbers != sorted(numbers):
            raise ValueError('Input should be a list sorted in non-decreasing order')
        return numbers
