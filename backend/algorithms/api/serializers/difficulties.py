from rest_framework import serializers
from rest_framework.reverse import reverse

from algorithms.models import Difficulty


class DifficultySerializer(serializers.ModelSerializer[Difficulty]):
    links = serializers.SerializerMethodField()

    class Meta:
        model = Difficulty
        fields = ['links', 'name', 'slug']

    def get_links(self, instance: Difficulty) -> dict[str, str]:
        algorithm_list_url = reverse('algorithm-list', request=self.context['request'])
        return {
            'algorithms': f'{algorithm_list_url}?difficulty={instance.slug}',
        }
