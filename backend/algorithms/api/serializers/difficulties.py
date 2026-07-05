from rest_framework import serializers

from algorithms.models import Difficulty


class DifficultySerializer(serializers.ModelSerializer[Difficulty]):
    class Meta:
        model = Difficulty
        fields = ['name', 'slug']
