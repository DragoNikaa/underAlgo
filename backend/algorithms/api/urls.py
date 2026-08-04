from django.urls import include, path
from rest_framework.routers import DefaultRouter

from algorithms.api import views

router = DefaultRouter()
router.register('algorithms', views.AlgorithmViewSet)
router.register('categories', views.CategoryViewSet)
router.register('difficulties', views.DifficultyViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
