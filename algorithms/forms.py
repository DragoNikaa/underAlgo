from typing import TYPE_CHECKING

from django.forms import ModelForm

from algorithms.models import Comment
from common.utils import CustomAutoIdBaseForm

if TYPE_CHECKING:
    _BaseModelForm = ModelForm[Comment]
else:
    _BaseModelForm = ModelForm


class CommentForm(_BaseModelForm, CustomAutoIdBaseForm):
    prefix = "comment"

    class Meta:
        model = Comment
        fields = ["body"]
