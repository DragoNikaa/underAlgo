from typing import TYPE_CHECKING

from django.contrib.auth.forms import UserCreationForm

from users.models import User

if TYPE_CHECKING:
    _BaseUserCreationForm = UserCreationForm[User]
else:
    _BaseUserCreationForm = UserCreationForm


class CustomUserCreationForm(_BaseUserCreationForm):
    class Meta:
        model = User
        fields = _BaseUserCreationForm.Meta.fields + ("email",)  # type: ignore
