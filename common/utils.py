from typing import Any

from django.forms import Form


class CustomAutoIdBaseForm(Form):
    def __init__(self, *args: Any, **kwargs: Any):
        super().__init__(*args, **kwargs)
        self.auto_id = "%s-input"
