from django_filters import rest_framework as filters

from algorithms.models import Algorithm


class AlgorithmFilter(filters.FilterSet):
    difficulty = filters.CharFilter(field_name='difficulty__slug')
    category = filters.CharFilter(field_name='categories__slug')

    class Meta:
        model = Algorithm
        fields = ['difficulty', 'category']
