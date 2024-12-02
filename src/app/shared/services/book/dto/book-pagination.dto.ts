import PaginationDto from '../../dto/pagination.dto';
import BookDto from './book.dto';

export default interface BookPaginationDto extends PaginationDto {
  items: BookDto[];
}
