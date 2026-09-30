from rest_framework import serializers

from algorithms.models import Difficulty


class DifficultySerializer(serializers.ModelSerializer[Difficulty]):
    algorithm_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Difficulty
        fields = ['name', 'slug', 'algorithm_count']
