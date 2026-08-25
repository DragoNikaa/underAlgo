from typing import Any

from rest_framework import serializers


class BinarySearchInputSerializer(serializers.Serializer[Any]):
    numbers = serializers.ListField(
        child=serializers.IntegerField(),
        allow_empty=False,
    )
    target = serializers.IntegerField()

    @staticmethod
    def validate_numbers(value: list[int]) -> list[int]:
        if value != sorted(value):
            raise serializers.ValidationError('This list must be sorted in non-decreasing order.')
        return value
