from django.urls import path

from . import views

urlpatterns = [
    path("", views.AlgorithmsView.as_view(), name="algorithms"),
]
