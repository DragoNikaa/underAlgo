from django.db import models

from algorithms.models.category import Category
from algorithms.models.difficulty import Difficulty
from core.models import SlugModel, TimeStampedModel


def _default_input_description() -> dict[str, str]:
    return {'parameter': 'Input description will be added soon.'}


class Algorithm(SlugModel, TimeStampedModel):
    name = models.CharField(max_length=100, unique=True)
    general_description = models.TextField(default='General description will be added soon.')
    input_description = models.JSONField(default=_default_input_description)
    output_description = models.TextField(default='Output description will be added soon.')
    code = models.JSONField(default=list)

    difficulty = models.ForeignKey(Difficulty, on_delete=models.PROTECT, related_name='algorithms')
    categories = models.ManyToManyField(Category, related_name='algorithms')

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return self.name
