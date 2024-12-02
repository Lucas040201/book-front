export default interface PaginationDto {
  count: number;
  currentPage: number;
  lastPage: number;
  items: unknown;
  limit: number;
}
