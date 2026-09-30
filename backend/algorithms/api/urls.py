from django.urls import include, path
from rest_framework.routers import DefaultRouter

from algorithms.api import views

router = DefaultRouter()
router.register('categories', views.CategoryViewSet)
router.register('difficulties', views.DifficultyViewSet)
router.register('', views.AlgorithmViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
