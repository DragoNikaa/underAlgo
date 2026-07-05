from django.db import models

from .algorithm import Algorithm


class TestCase(models.Model):
    body = models.JSONField(default=dict)
    algorithm = models.ForeignKey(Algorithm, on_delete=models.CASCADE, related_name='test_cases')

    class Meta:
        ordering = ['-algorithm__created_at', 'id']

    def __str__(self) -> str:
        return f'test case #{self.pk} ({self.algorithm})'
