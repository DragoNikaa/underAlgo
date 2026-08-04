export interface PaginatedResponse<T> {
  links: PaginationLinks;
  page: PaginationInfo;
  count: number;
  results: T[];
}

export interface PaginationLinks {
  first: string;
  previous: string | null;
  next: string | null;
  last: string;
}

export interface PaginationInfo {
  current: number;
  total: number;
}
