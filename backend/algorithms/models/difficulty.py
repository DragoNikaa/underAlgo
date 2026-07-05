from django.db import models

from core.models import SlugModel


class Difficulty(SlugModel):
    name = models.CharField(max_length=10, unique=True)

    class Meta:
        ordering = ['id']

    def __str__(self) -> str:
        return self.name
