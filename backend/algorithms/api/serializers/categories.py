from rest_framework import serializers

from algorithms.models import Category


class CategorySerializer(serializers.ModelSerializer[Category]):
    algorithm_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Category
        fields = ['name', 'slug', 'algorithm_count']
