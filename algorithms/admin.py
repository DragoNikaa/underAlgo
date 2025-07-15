from django.contrib import admin

from algorithms import models

admin.site.register(models.Difficulty)
admin.site.register(models.Category)
admin.site.register(models.Algorithm)
admin.site.register(models.TestCase)
