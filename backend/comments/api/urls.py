from django.urls import include, path
from rest_framework.routers import SimpleRouter
from rest_framework_nested.routers import NestedSimpleRouter

from comments.api import views

router = SimpleRouter()
router.register('', views.CommentViewSet, basename='comment')

replies_router = NestedSimpleRouter(router, '', lookup='comment')
replies_router.register('replies', views.ReplyViewSet, basename='reply')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(replies_router.urls)),
]
