import { IBook } from './book.interface';

export interface IAuthor {
  AuthorID: string;
  FullName: string;
  Bio?: string;
  books?: IBook[];
}
