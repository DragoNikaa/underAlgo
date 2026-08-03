from rest_framework import serializers
from rest_framework.reverse import reverse

from algorithms.models import Category


class CategorySerializer(serializers.ModelSerializer[Category]):
    links = serializers.SerializerMethodField()
    algorithm_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Category
        fields = ['links', 'name', 'slug', 'algorithm_count']

    def get_links(self, instance: Category) -> dict[str, str]:
        algorithm_list_url = reverse('algorithm-list', request=self.context['request'])
        return {
            'algorithms': f'{algorithm_list_url}?category={instance.slug}',
        }
