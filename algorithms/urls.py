from django.urls import path

from . import views

urlpatterns = [
    path("", views.AlgorithmsView.as_view(), name="algorithms"),
    path("<str:algorithm_name>/", views.VisualizationView.as_view(), name="visualization"),
]
