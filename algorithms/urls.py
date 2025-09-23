from django.urls import path

from algorithms import views

urlpatterns = [
    path("", views.AlgorithmsView.as_view(), name="algorithms"),
    path("<str:algorithm_slug>/", views.VisualizationView.as_view(), name="visualization"),
    path("<str:algorithm_slug>/start", views.VisualizationStartView.as_view(), name="visualization-start"),
    path("<str:algorithm_slug>/next-step", views.VisualizationNextStepView.as_view(), name="visualization-next-step"),
    path("<str:algorithm_slug>/discussion", views.DiscussionView.as_view(), name="discussion"),
    path("<str:algorithm_slug>/discussion/replies/<int:parent_comment_id>", views.CommentRepliesView.as_view(),
         name="comment-replies"),
    path("<str:algorithm_slug>/discussion/edit/<int:comment_id>", views.EditCommentView.as_view(), name="edit-comment"),
    path("<str:algorithm_slug>/discussion/delete/<int:comment_id>", views.DeleteCommentView.as_view(),
         name="delete-comment"),
    path("<str:algorithm_slug>/discussion/like/<int:comment_id>", views.LikeCommentView.as_view(), name="like-comment"),
]
