import { IsUUID, IsOptional, IsDate } from 'class-validator';
import { IBooksAuthors } from '../../interfaces/bookauthor.interface';

export class BooksAuthorsDto implements IBooksAuthors {
  @IsUUID()
  public BookID: string;
  @IsUUID()
  public AuthorID: string;

  constructor(data: IBooksAuthors) {
    this.BookID = data.BookID;
    this.AuthorID = data.AuthorID;
  }
}
