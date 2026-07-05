from django.contrib import admin

from algorithms import models

admin.site.register([
    models.Algorithm,
    models.Category,
    models.Difficulty,
    models.TestCase,
])
