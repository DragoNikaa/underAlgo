export interface PaginatedResponse<T> {
  page: PaginationInfo;
  count: number;
  results: T[];
}

export interface PaginationInfo {
  current: number;
  total: number;
}
