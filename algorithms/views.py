import json
from typing import Any

from django.core.paginator import Page, Paginator
from django.db.models import Count, QuerySet
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.utils.text import slugify
from django.views import View
from pydantic import ValidationError
from pydantic_core import ErrorDetails

from algorithms import algorithms_steps
from algorithms.forms import CommentForm
from algorithms.models import Algorithm, Category, Comment, Difficulty, TestCase


class AlgorithmsView(View):
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

    @staticmethod
    def _get_page_obj(algorithms: QuerySet[Algorithm], page_number: str | None) -> Page[Algorithm]:
        paginator = Paginator(algorithms, 2)
        return paginator.get_page(page_number)


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


class DiscussionView(View):
    template_name = "algorithms/discussion.html"

    def get(self, request: HttpRequest, algorithm_slug: str) -> HttpResponse:
        algorithm = Algorithm.objects.get(slug=algorithm_slug)
        comments = algorithm.comment_set.filter(reply_to=None).order_by("-created").annotate(like_count=Count("like"))
        page_obj = self._get_page_obj(comments, request.GET.get("page"))
        form = CommentForm()
        context = {"algorithm_name": algorithm.name, "page_obj": page_obj, "form": form}
        return render(request, self.template_name, context)

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
        context = {"algorithm_name": algorithm.name, "page_obj": page_obj, "form": form}
        return render(request, self.template_name, context)

    @staticmethod
    def _get_page_obj(comments: QuerySet[Comment], page_number: str | None) -> Page[Comment]:
        paginator = Paginator(comments, 2)
        return paginator.get_page(page_number)
