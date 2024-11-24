import { IBook } from '../../interfaces/book.interface';
import { IsString, IsUUID, IsOptional, IsArray, IsDate, IsInt, Min } from 'class-validator';
import { AuthorDto } from './author.dto';
import { CategoryDto } from './category.dto';
export class BookDto implements IBook {
  @IsUUID()
  public BookID: string;

  @IsString()
  public Title: string;

  @IsOptional()
  @IsInt()
  @Min(1900)
  public PublicationYear?: number;

  @IsString()
  public ISBN: string;

  @IsString()
  public AuthorBook: string;

  @IsString()
  public CategoryBook: string;

  @IsOptional()
  @IsString()
  public Description?: string;

  @IsOptional()
  @IsDate()
  public deletedAt?: Date;

  @IsArray()
  public authors: AuthorDto[] = [];

  @IsArray()
  public categories: CategoryDto[] = [];

  constructor(book: IBook) {
    this.BookID = book.BookID;
    this.Title = book.Title;
    this.PublicationYear = book.PublicationYear;
    this.ISBN = book.ISBN;
    this.Description = book.Description;
    this.AuthorBook = book.AuthorBook;
    this.CategoryBook = book.CategoryBook;
    this.authors = book.authors ? book.authors.map(author => new AuthorDto(author)) : [];
    this.categories = book.categories ? book.categories.map(category => new CategoryDto(category)) : [];
  }
}
