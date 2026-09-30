from typing import Any

from rest_framework import pagination
from rest_framework.response import Response


class CustomPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data: Any) -> Response:
        assert self.page is not None

        return Response({
            'page': {
                'current': self.page.number,
                'total': self.page.paginator.num_pages,
            },
            'count': self.page.paginator.count,
            'results': data,
        })
