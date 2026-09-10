from django.urls import path

from core.api.views import CSRFView

urlpatterns = [
    path('csrf/', CSRFView.as_view()),
]
