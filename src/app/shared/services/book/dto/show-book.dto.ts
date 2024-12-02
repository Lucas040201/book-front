import BaseDto from '../../dto/base.dto';
import BookDto from './book.dto';

export default interface ShowBookDto extends BaseDto {
  data: BookDto;
}
