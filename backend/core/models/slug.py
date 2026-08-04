from typing import Any

from django.db import models
from django.utils.text import slugify


class SlugModel(models.Model):
    slug = models.SlugField(unique=True, blank=True, max_length=100)

    class Meta:
        abstract = True

    def save(self, *args: Any, **kwargs: Any) -> None:
        if not self.slug:
            self.slug = slugify(str(self))
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return ''
