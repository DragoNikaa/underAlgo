from typing import TYPE_CHECKING

from django.contrib.auth.forms import AuthenticationForm, UserCreationForm

from common.utils import CustomAutoIdBaseForm
from users.models import User

if TYPE_CHECKING:
    _BaseUserCreationForm = UserCreationForm[User]
else:
    _BaseUserCreationForm = UserCreationForm


class RegistrationForm(_BaseUserCreationForm, CustomAutoIdBaseForm):
    class Meta:
        model = User
        fields = _BaseUserCreationForm.Meta.fields + ("email",)  # type: ignore


class LoginForm(AuthenticationForm, CustomAutoIdBaseForm):
    ...
