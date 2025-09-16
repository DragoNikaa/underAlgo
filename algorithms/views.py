import json
from abc import ABC, abstractmethod
from typing import Any

from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import PermissionDenied
from django.db.models import Count, QuerySet
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.utils.decorators import method_decorator
from django.utils.text import slugify
from django.views import View
from pydantic import ValidationError
from pydantic_core import ErrorDetails

from algorithms import algorithms_steps
from algorithms.forms import CommentForm
from algorithms.models import Algorithm, Category, Comment, Difficulty, TestCase
from common.utils import PaginationBaseView
from users.models import User


class AlgorithmsView(PaginationBaseView):
    template_name = "algorithms/algorithms.html"

    def get(self, request: HttpRequest) -> HttpResponse:
        difficulties, categories = self._get_search_filters()
        algorithms = self._get_filtered_algorithms(request)
        page_obj = self._get_page_obj(algorithms, request.GET.get("page"))
        context = {"difficulties": difficulties, "categories": categories, "page_obj": page_obj}
        return render(request, self.template_name, context)

    @staticmethod
    def _get_search_filters() -> tuple[QuerySet[Difficulty], QuerySet[Category]]:
        difficulties = Difficulty.objects.annotate(algorithm_count=Count("algorithm"))
        categories = Category.objects.annotate(algorithm_count=Count("algorithm")).order_by("-algorithm_count")
        return difficulties, categories

    def _get_filtered_algorithms(self, request: HttpRequest) -> QuerySet[Algorithm]:
        algorithms = Algorithm.objects.all()
        algorithms = self._filter_by_name(algorithms, request.GET.get("name"))
        algorithms = self._filter_by_difficulty(algorithms, request.GET.get("difficulty"))
        algorithms = self._filter_by_categories(algorithms, request.GET.getlist("category"))
        return algorithms

    @staticmethod
    def _filter_by_name(algorithms: QuerySet[Algorithm], name_input: str | None) -> QuerySet[Algorithm]:
        if name_input:
            algorithms = algorithms.filter(slug__contains=slugify(name_input))
        return algorithms

    @staticmethod
    def _filter_by_difficulty(algorithms: QuerySet[Algorithm], difficulty_slug: str | None) -> QuerySet[Algorithm]:
        if difficulty_slug:
            algorithms = algorithms.filter(difficulty__slug=difficulty_slug)
        return algorithms

    @staticmethod
    def _filter_by_categories(algorithms: QuerySet[Algorithm], category_slugs: list[str]) -> QuerySet[Algorithm]:
        for slug in category_slugs:
            algorithms = algorithms.filter(categories__slug=slug)
        return algorithms


class VisualizationView(View):
    template_name = "algorithms/animations/binary_search.html"

    def get(self, request: HttpRequest, algorithm_slug: str) -> HttpResponse:
        algorithm = get_object_or_404(Algorithm, slug=algorithm_slug)
        context = self._get_algorithm_data(algorithm)
        return render(request, self.template_name, context)

    @staticmethod
    def _get_algorithm_data(algorithm: Algorithm) -> dict[str, Any]:
        test_cases = algorithm.testcase_set.all()
        return {"algorithm": algorithm, "test_cases": test_cases}


class VisualizationStartView(View):
    def post(self, request: HttpRequest, algorithm_slug: str) -> HttpResponse:
        try:
            algorithm_input = self._get_algorithm_input(request)
        except ValidationError as error:
            errors_details = self._get_cleaned_errors_details(error)
            return JsonResponse({"errors": errors_details}, status=422)
        steps = self._get_initial_algorithm_steps(algorithm_input)
        first_step = steps.pop(0)
        self._create_algorithm_session(request, algorithm_slug, algorithm_input, steps)
        return JsonResponse({"input": algorithm_input, "step": first_step})

    def _get_algorithm_input(self, request: HttpRequest) -> dict[str, Any]:
        test_case = self._get_test_case(request)
        algorithm_input: dict[str, Any] = test_case.body
        return algorithm_input

    @staticmethod
    def _get_test_case(request: HttpRequest) -> TestCase:
        test_case_data = json.loads(request.body)["test_case"]
        test_case_id = test_case_data["id"]
        if test_case_id == "custom":
            validated_input = algorithms_steps.BinarySearchInput(**test_case_data["body"]).model_dump()
            return TestCase(body=validated_input)
        return get_object_or_404(TestCase, id=test_case_id)

    def _get_cleaned_errors_details(self, error: ValidationError) -> list[dict[str, Any]]:
        return [
            {
                "field": error_details["loc"][0],
                "message": self._get_cleaned_error_message(error_details),
                "input": error_details["input"]
            }
            for error_details in error.errors()
        ]

    @staticmethod
    def _get_cleaned_error_message(error_data: ErrorDetails) -> str:
        return error_data["msg"].replace("Value error, ", "") + "."

    @staticmethod
    def _get_initial_algorithm_steps(algorithm_input: dict[str, Any]) -> list[dict[str, Any]]:
        return algorithms_steps.BinarySearch(**algorithm_input).get_steps()

    @staticmethod
    def _create_algorithm_session(request: HttpRequest, algorithm_slug: str, algorithm_input: dict[str, Any],
                                  steps: list[dict[str, Any]]) -> None:
        request.session[algorithm_slug] = {"input": algorithm_input, "steps": steps}


class VisualizationNextStepView(View):
    def post(self, request: HttpRequest, algorithm_slug: str) -> HttpResponse:
        steps = self._get_algorithm_steps_from_session(request, algorithm_slug)
        next_step = steps.pop(0)
        self._update_algorithm_session(request, algorithm_slug, steps)
        return JsonResponse({"step": next_step})

    @staticmethod
    def _get_algorithm_steps_from_session(request: HttpRequest, algorithm_slug: str) -> list[dict[str, Any]]:
        steps: list[dict[str, Any]] = request.session[algorithm_slug]["steps"]
        return steps

    @staticmethod
    def _update_algorithm_session(request: HttpRequest, algorithm_slug: str, steps: list[dict[str, Any]]) -> None:
        algorithm_input = request.session[algorithm_slug]["input"]
        request.session[algorithm_slug] = {"input": algorithm_input, "steps": steps}


class DiscussionView(PaginationBaseView):
    template_name = "algorithms/comment_list.html"

    def get(self, request: HttpRequest, algorithm_slug: str) -> HttpResponse:
        algorithm = get_object_or_404(Algorithm, slug=algorithm_slug)
        comments = algorithm.comment_set.filter(reply_to=None).order_by("-created").annotate(like_count=Count("like"))
        page_obj = self._get_page_obj(comments, request.GET.get("page"))
        form = CommentForm()
        context = {"algorithm": algorithm, "page_obj": page_obj, "form": form}
        return render(request, self.template_name, context)

    @method_decorator(login_required)
    def post(self, request: HttpRequest, algorithm_slug: str) -> HttpResponse:
        algorithm = Algorithm.objects.get(slug=algorithm_slug)
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.user = request.user
            comment.algorithm = algorithm
            comment.save()
            return redirect("discussion", algorithm_slug=algorithm_slug)
        comments = algorithm.comment_set.filter(reply_to=None).order_by("-created").annotate(like_count=Count("like"))
        page_obj = self._get_page_obj(comments, request.GET.get("page"))
        context = {"algorithm": algorithm, "page_obj": page_obj, "form": form}
        return render(request, self.template_name, context)


class _EditDeleteCommentBaseView(LoginRequiredMixin, View, ABC):
    @property
    @abstractmethod
    def template_name(self) -> str:
        ...

    def base_get(self, request: HttpRequest, algorithm_slug: str, comment_id: int,
                 render_form: bool = False) -> HttpResponse:
        comment = get_object_or_404(Comment, id=comment_id)
        self._check_user_permission(request, comment.user)
        context = self._get_context(algorithm_slug, comment, render_form)
        return render(request, self.template_name, context)

    @staticmethod
    def _check_user_permission(request: HttpRequest, user: User) -> None:
        if request.user != user:
            raise PermissionDenied

    @staticmethod
    def _get_context(algorithm_slug: str, comment: Comment, render_form: bool) -> dict[str, Any]:
        algorithm = get_object_or_404(Algorithm, slug=algorithm_slug)
        context: dict[str, Any] = {"algorithm": algorithm, "comment": comment}
        if render_form:
            context["form"] = CommentForm(instance=comment)
        return context


class EditCommentView(_EditDeleteCommentBaseView):
    template_name = "algorithms/edit_comment.html"

    def get(self, request: HttpRequest, algorithm_slug: str, comment_id: int) -> HttpResponse:
        return self.base_get(request, algorithm_slug, comment_id, True)

    def post(self, request: HttpRequest, algorithm_slug: str, comment_id: int) -> HttpResponse:
        comment = Comment.objects.get(id=comment_id)
        form = CommentForm(request.POST, instance=comment)
        if form.is_valid():
            form.save()
            return redirect("discussion", algorithm_slug=algorithm_slug)
        return self._render_invalid_form(request, algorithm_slug, comment, form)

    def _render_invalid_form(self, request: HttpRequest, algorithm_slug: str, comment: Comment,
                             form: CommentForm) -> HttpResponse:
        algorithm = Algorithm.objects.get(slug=algorithm_slug)
        context = {"algorithm": algorithm, "comment": comment, "form": form}
        return render(request, self.template_name, context)


class DeleteCommentView(_EditDeleteCommentBaseView):
    template_name = "algorithms/delete_comment.html"

    def get(self, request: HttpRequest, algorithm_slug: str, comment_id: int) -> HttpResponse:
        return self.base_get(request, algorithm_slug, comment_id)

    def post(self, request: HttpRequest, algorithm_slug: str, comment_id: int) -> HttpResponse:
        self._delete_comment(comment_id)
        return redirect("discussion", algorithm_slug=algorithm_slug)

    @staticmethod
    def _delete_comment(comment_id: int) -> None:
        comment = Comment.objects.get(id=comment_id)
        comment.delete()
