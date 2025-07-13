from django.shortcuts import render
from django.views import View


class AlgorithmsView(View):
    template_name = "algorithms/algorithms.html"

    def get(self, request):
        return render(request, self.template_name)
