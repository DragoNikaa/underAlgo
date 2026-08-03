import django_filters.rest_framework as filters

from algorithms.models import Algorithm, Category, Difficulty


class AlgorithmFilter(filters.FilterSet):
    difficulty = filters.ModelChoiceFilter(
        to_field_name='slug',
        queryset=Difficulty.objects.all()
    )
    category = filters.ModelMultipleChoiceFilter(
        field_name='categories__slug',
        to_field_name='slug',
        queryset=Category.objects.all(),
        conjoined=True,
        label='Categories'
    )

    class Meta:
        model = Algorithm
        fields = ['difficulty', 'category']
