import json
from typing import Any

from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import render
from django.views import View

from algorithms import algorithms_steps
from algorithms.models import Algorithm


class AlgorithmsView(View):
    template_name = "algorithms/algorithms.html"

    def get(self, request: HttpRequest) -> HttpResponse:
        return render(request, self.template_name)


class VisualizationView(View):
    TEMPLATE_NAME = "algorithms/visualization.html"

    def get(self, request: HttpRequest, algorithm_name: str) -> HttpResponse:
        if self._is_ajax_request(request):
            return self._handle_next_algorithm_step(request, algorithm_name)
        self._delete_algorithm_session(request, algorithm_name)
        return self._render_algorithm_view(request, algorithm_name)

    @staticmethod
    def _is_ajax_request(request: HttpRequest) -> bool:
        return request.headers.get("X-Requested-With") == "XMLHttpRequest"

    def _handle_next_algorithm_step(self, request: HttpRequest, algorithm_name: str) -> HttpResponse:
        kwargs, steps = self._get_algorithm_kwargs_and_steps(request, algorithm_name)
        next_step = steps.pop(0)
        self._update_algorithm_session(request, algorithm_name, kwargs, steps)
        return JsonResponse({"kwargs": kwargs, "step": next_step})

    @staticmethod
    def _get_algorithm_kwargs_and_steps(request: HttpRequest, algorithm_name: str) -> tuple[
        dict[str, Any], list[dict[str, Any]]]:
        try:
            algorithm_data = request.session[algorithm_name]
            kwargs, steps = algorithm_data["kwargs"], algorithm_data["steps"]
        except KeyError:
            kwargs = {"numbers": [-2, 1, 3, 5, 6, 8, 13, 14], "target": 1}
            steps = algorithms_steps.BinarySearch(**kwargs).get_steps()
        return kwargs, steps

    def _update_algorithm_session(self, request: HttpRequest, algorithm_name: str, kwargs: dict[str, Any],
                                  steps: list[dict[str, Any]]) -> None:
        if steps:
            request.session[algorithm_name] = {"kwargs": kwargs, "steps": steps}
        else:
            self._delete_algorithm_session(request, algorithm_name)

    @staticmethod
    def _delete_algorithm_session(request: HttpRequest, algorithm_name: str) -> None:
        request.session.pop(algorithm_name, None)

    def _render_algorithm_view(self, request: HttpRequest, algorithm_name: str) -> HttpResponse:
        algorithm = self._get_algorithm_from_db(algorithm_name)
        context = self._get_algorithm_data(algorithm)
        return render(request, self.TEMPLATE_NAME, context)

    @staticmethod
    def _get_algorithm_from_db(algorithm_name: str) -> Algorithm:
        unslugged_algorithm_name = algorithm_name.replace("-", " ")
        return Algorithm.objects.get(name=unslugged_algorithm_name)

    @staticmethod
    def _get_algorithm_data(algorithm: Algorithm) -> dict[str, Any]:
        code = json.loads(algorithm.code)
        return {"name": algorithm.name, "code": code}
