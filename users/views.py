from abc import ABC, abstractmethod
from typing import Any, TypeAlias, cast

from django.contrib.auth import login, logout
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.models import User
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render
from django.views import View

_UserRegistrationForm: TypeAlias = "UserCreationForm[User]"
_UserForm: TypeAlias = "_UserRegistrationForm | AuthenticationForm"


class _RegistrationLoginBaseView(View, ABC):
    FORM_FIELD_ID = "%s-input"

    @property
    @abstractmethod
    def template_name(self) -> str:
        ...

    @staticmethod
    @abstractmethod
    def _get_authenticated_user(request: HttpRequest, form: Any) -> AbstractBaseUser:
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
        login(request, cast(User, user))


class RegistrationView(_RegistrationLoginBaseView):
    template_name = "users/registration.html"

    def get(self, request: HttpRequest) -> HttpResponse:
        form: _UserRegistrationForm = UserCreationForm(auto_id=self.FORM_FIELD_ID)
        return self.base_get(request, form)

    def post(self, request: HttpRequest) -> HttpResponse:
        form: _UserRegistrationForm = UserCreationForm(request.POST, auto_id=self.FORM_FIELD_ID)
        return self.base_post(request, form)

    @staticmethod
    def _get_authenticated_user(request: HttpRequest, form: _UserRegistrationForm) -> AbstractBaseUser:
        return form.save()


class LoginView(_RegistrationLoginBaseView):
    template_name = "users/login.html"

    def get(self, request: HttpRequest) -> HttpResponse:
        form = AuthenticationForm(auto_id=self.FORM_FIELD_ID)
        return self.base_get(request, form)

    def post(self, request: HttpRequest) -> HttpResponse:
        form = AuthenticationForm(data=request.POST, auto_id=self.FORM_FIELD_ID)
        return self.base_post(request, form)

    @staticmethod
    def _get_authenticated_user(request: HttpRequest, form: AuthenticationForm) -> AbstractBaseUser:
        return form.get_user()


class LogoutView(View):
    @staticmethod
    def get(request: HttpRequest) -> HttpResponse:
        logout(request)
        return redirect("algorithms")
