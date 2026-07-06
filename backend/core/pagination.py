from typing import Any

from rest_framework import pagination
from rest_framework.response import Response
from rest_framework.utils.urls import remove_query_param, replace_query_param


class CustomPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data: Any) -> Response:
        assert self.request is not None
        assert self.page is not None

        base_url = self.request.build_absolute_uri()
        last_page = self.page.paginator.num_pages

        return Response({
            'links': {
                'first': remove_query_param(base_url, self.page_query_param),
                'previous': self.get_previous_link(),
                'next': self.get_next_link(),
                'last': replace_query_param(base_url, self.page_query_param, last_page),
            },
            'page': {
                'current': self.page.number,
                'total': last_page,
            },
            'count': self.page.paginator.count,
            'results': data,
        })
