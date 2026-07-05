from rest_framework import serializers

from algorithms.models import TestCase


class TestCaseSerializer(serializers.ModelSerializer[TestCase]):
    class Meta:
        model = TestCase
        fields = ['body']
