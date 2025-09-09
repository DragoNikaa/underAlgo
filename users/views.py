from abc import ABC, abstractmethod
from typing import Any

from django.contrib.auth import login, logout
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render
from django.views import View

from users.forms import LoginForm, RegistrationForm
from users.models import User


class _RegistrationLoginBaseView(View, ABC):
    _UserForm = RegistrationForm | LoginForm

    @property
    @abstractmethod
    def template_name(self) -> str:
        ...

    @staticmethod
    @abstractmethod
    def _get_authenticated_user(request: HttpRequest, form: Any) -> User:
        ...

    def base_get(self, request: HttpRequest, form: _UserForm) -> HttpResponse:
        if request.user.is_authenticated:
            return redirect("algorithms")
        context = {"form": form}
        return render(request, self.template_name, context)

    def base_post(self, request: HttpRequest, form: _UserForm) -> HttpResponse:
        if form.is_valid():
            self._get_and_login_user(request, form)
            return redirect("algorithms")
        context = {"form": form}
        return render(request, self.template_name, context)

    def _get_and_login_user(self, request: HttpRequest, form: _UserForm) -> None:
        user = self._get_authenticated_user(request, form)
        login(request, user)


class RegistrationView(_RegistrationLoginBaseView):
    template_name = "users/registration.html"

    def get(self, request: HttpRequest) -> HttpResponse:
        form = RegistrationForm()
        return self.base_get(request, form)

    def post(self, request: HttpRequest) -> HttpResponse:
        form = RegistrationForm(request.POST)
        return self.base_post(request, form)

    @staticmethod
    def _get_authenticated_user(request: HttpRequest, form: RegistrationForm) -> User:
        return form.save()


class LoginView(_RegistrationLoginBaseView):
    template_name = "users/login.html"

    def get(self, request: HttpRequest) -> HttpResponse:
        form = LoginForm()
        return self.base_get(request, form)

    def post(self, request: HttpRequest) -> HttpResponse:
        form = LoginForm(data=request.POST)
        return self.base_post(request, form)

    @staticmethod
    def _get_authenticated_user(request: HttpRequest, form: LoginForm) -> User:
        return form.get_user()


class LogoutView(View):
    @staticmethod
    def get(request: HttpRequest) -> HttpResponse:
        logout(request)
        return redirect("algorithms")
