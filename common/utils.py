from typing import Any, TypeVar

from django.core.paginator import Page, Paginator
from django.db.models import Model, QuerySet
from django.forms import Form
from django.http import HttpRequest
from django.views import View

from users.models import User


class AuthenticatedHttpRequest(HttpRequest):
    user: User


class CustomAutoIdBaseForm(Form):
    def __init__(self, *args: Any, **kwargs: Any):
        super().__init__(*args, **kwargs)
        self.auto_id = "%s-input"


T = TypeVar("T", bound=Model)


class PaginationBaseView(View):
    @staticmethod
    def _get_page_obj(object_list: QuerySet[T], page_number: str | None, per_page: int = 4) -> Page[T]:
        paginator = Paginator(object_list, per_page)
        return paginator.get_page(page_number)
