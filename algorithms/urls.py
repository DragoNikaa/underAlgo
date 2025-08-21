from django.urls import path

from . import views

urlpatterns = [
    path("", views.AlgorithmsView.as_view(), name="algorithms"),
    path("<str:algorithm_slug>/", views.VisualizationView.as_view(), name="visualization"),
    path("<str:algorithm_slug>/start", views.VisualizationStartView.as_view(), name="visualization-start"),
    path("<str:algorithm_slug>/next-step", views.VisualizationNextStepView.as_view(), name="visualization-next-step"),
]
