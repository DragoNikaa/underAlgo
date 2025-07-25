from django.urls import path

from . import views

urlpatterns = [
    path("", views.AlgorithmsView.as_view(), name="algorithms"),
    path("<str:algorithm_name>/", views.VisualizationView.as_view(), name="visualization"),
    path("<str:algorithm_name>/start", views.VisualizationStartView.as_view(), name="visualization-start"),
    path("<str:algorithm_name>/next-step", views.VisualizationNextStepView.as_view(), name="visualization-next-step"),
]
