import { IsString, IsUUID, IsOptional, IsArray, IsDate } from 'class-validator';
import { BookDto } from './book.dto';
import { IAuthor } from '../../interfaces/author.interface';

export class AuthorDto implements IAuthor {
  @IsUUID()
  public AuthorID: string;

  @IsString()
  public FullName: string;

  @IsOptional()
  @IsString()
  public Bio?: string;

  @IsOptional()
  @IsArray()
  public books: BookDto[] = [];

  constructor(author: IAuthor) {
    this.AuthorID = author.AuthorID;
    this.FullName = author.FullName;
    this.Bio = author.Bio;
    this.books = author.books?.map(book => new BookDto(book));
  }
}
