import json
from typing import Any

from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.views import View
from pydantic import ValidationError
from pydantic_core import ErrorDetails

from algorithms import algorithms_steps
from algorithms.models import Algorithm, TestCase


class AlgorithmsView(View):
    template_name = "algorithms/algorithms.html"

    def get(self, request: HttpRequest) -> HttpResponse:
        return render(request, self.template_name)


class VisualizationView(View):
    TEMPLATE_NAME = "algorithms/animations/binary_search.html"

    def get(self, request: HttpRequest, algorithm_name: str) -> HttpResponse:
        algorithm = self._get_algorithm_from_db(algorithm_name)
        context = self._get_algorithm_data(algorithm)
        return render(request, self.TEMPLATE_NAME, context)

    @staticmethod
    def _get_algorithm_from_db(algorithm_name: str) -> Algorithm:
        unslugged_algorithm_name = algorithm_name.replace("-", " ")
        return get_object_or_404(Algorithm, name=unslugged_algorithm_name)

    @staticmethod
    def _get_algorithm_data(algorithm: Algorithm) -> dict[str, Any]:
        test_cases = algorithm.testcase_set.all()
        return {"name": algorithm.name, "code": algorithm.code, "test_cases": test_cases}


class VisualizationStartView(View):
    def post(self, request: HttpRequest, algorithm_name: str) -> HttpResponse:
        try:
            algorithm_input = self._get_algorithm_input(request)
        except ValidationError as error:
            errors_details = self._get_cleaned_errors_details(error)
            return JsonResponse({"errors": errors_details}, status=422)
        steps = self._get_initial_algorithm_steps(algorithm_input)
        first_step = steps.pop(0)
        self._create_algorithm_session(request, algorithm_name, algorithm_input, steps)
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
    def _create_algorithm_session(request: HttpRequest, algorithm_name: str, algorithm_input: dict[str, Any],
                                  steps: list[dict[str, Any]]) -> None:
        request.session[algorithm_name] = {"input": algorithm_input, "steps": steps}


class VisualizationNextStepView(View):
    def post(self, request: HttpRequest, algorithm_name: str) -> HttpResponse:
        steps = self._get_algorithm_steps_from_session(request, algorithm_name)
        next_step = steps.pop(0)
        self._update_algorithm_session(request, algorithm_name, steps)
        return JsonResponse({"step": next_step})

    @staticmethod
    def _get_algorithm_steps_from_session(request: HttpRequest, algorithm_name: str) -> list[dict[str, Any]]:
        steps: list[dict[str, Any]] = request.session[algorithm_name]["steps"]
        return steps

    @staticmethod
    def _update_algorithm_session(request: HttpRequest, algorithm_name: str, steps: list[dict[str, Any]]) -> None:
        algorithm_input = request.session[algorithm_name]["input"]
        request.session[algorithm_name] = {"input": algorithm_input, "steps": steps}
