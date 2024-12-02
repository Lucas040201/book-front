import AuthorDto from './author.dto';

export default interface BookDto {
  id?: string;
  title: string;
  description: string;
  quantity: number;
  price: string;
  author?: AuthorDto;
}
