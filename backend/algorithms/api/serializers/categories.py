from rest_framework import serializers

from algorithms.models import Category


class CategorySerializer(serializers.ModelSerializer[Category]):
    class Meta:
        model = Category
        fields = ['name', 'slug']
