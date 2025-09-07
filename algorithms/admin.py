from django.contrib import admin

from algorithms import models

admin.site.register(
    [
        models.Difficulty,
        models.Category,
        models.Algorithm,
        models.TestCase,
        models.Comment,
        models.Like,
    ]
)
