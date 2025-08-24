import re
from typing import Any

from django.db import models
from django.template.defaultfilters import slugify


class Slugged(models.Model):
    slug = models.SlugField(blank=True, max_length=100)

    class Meta:
        abstract = True

    def save(self, *args: Any, **kwargs: Any) -> None:
        if not self.slug:
            self.slug = slugify(str(self))
        super().save(*args, **kwargs)


class Difficulty(Slugged):
    level = models.CharField(max_length=10)

    def __str__(self) -> str:
        return self.level


class Category(Slugged):
    name = models.CharField(max_length=50)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name


def default_input_description() -> dict[str, str]:
    return {"parameter": "Input description will be added soon."}


class Algorithm(Slugged):
    name = models.CharField(max_length=100)
    general_description = models.TextField(default="General description will be added soon.")
    input_description = models.JSONField(default=default_input_description)
    output_description = models.TextField(default="Output description will be added soon.")
    code = models.JSONField()

    difficulty = models.ForeignKey(Difficulty, on_delete=models.PROTECT)
    categories = models.ManyToManyField(Category)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created"]

    def short_description(self, max_length: int = 250) -> str:
        if len(self.general_description) <= max_length:
            return self.general_description
        return self._truncate_description_at_word_boundary(max_length)

    def _truncate_description_at_word_boundary(self, max_length: int) -> str:
        snippet = self.general_description[: max(0, max_length - 2)]
        match = re.match(r"^(.+?)\W+(?:\w+)?$", snippet)
        if match:
            return match.group(1) + "..."
        return "..."

    def __str__(self) -> str:
        return self.name


class TestCase(models.Model):
    body = models.JSONField()
    algorithm = models.ForeignKey(Algorithm, on_delete=models.CASCADE)

    class Meta:
        ordering = ["-algorithm__created", "id"]

    def __str__(self) -> str:
        return f"{self.algorithm} test case {self.id}"
