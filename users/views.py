from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render
from django.views import View


class RegistrationView(View):
    template_name = "users/registration.html"
    form_field_id = "%s-input"

    def get(self, request: HttpRequest) -> HttpResponse:
        form: "UserCreationForm[User]" = UserCreationForm(auto_id=self.form_field_id)
        context = {"form": form}
        return render(request, self.template_name, context)

    def post(self, request: HttpRequest) -> HttpResponse:
        form: "UserCreationForm[User]" = UserCreationForm(request.POST, auto_id=self.form_field_id)
        if form.is_valid():
            self._register_and_login_user(request, form)
            return redirect("algorithms")
        context = {"form": form}
        return render(request, self.template_name, context)

    @staticmethod
    def _register_and_login_user(request: HttpRequest, form: "UserCreationForm[User]") -> None:
        user = form.save()
        login(request, user)
