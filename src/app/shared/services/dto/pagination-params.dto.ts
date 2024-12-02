export default interface PaginationParamsDto {
  search?: string;
  limit: number;
  page: number;
  sort?: string;
}
