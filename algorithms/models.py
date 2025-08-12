from django.db import models


class Difficulty(models.Model):
    level = models.CharField(max_length=10)

    def __str__(self) -> str:
        return self.level


class Category(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name


def default_input_description() -> dict[str, str]:
    return {"parameter": "Input description will be added soon."}


class Algorithm(models.Model):
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

    def __str__(self) -> str:
        return self.name


class TestCase(models.Model):
    body = models.JSONField()
    algorithm = models.ForeignKey(Algorithm, on_delete=models.CASCADE)

    class Meta:
        ordering = ["-algorithm__created", "id"]

    def __str__(self) -> str:
        return f"{self.algorithm.name} test case {self.id}"
