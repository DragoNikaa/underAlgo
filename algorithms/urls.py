from django.urls import path

from . import views

urlpatterns = [
    path("algorithms/", views.AlgorithmsView.as_view(), name="algorithms"),
]
