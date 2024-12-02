import BaseDto from '../../dto/base.dto';
import BookPaginationDto from './book-pagination.dto';

export default interface ListBookDto extends BaseDto {
  data: BookPaginationDto;
}
