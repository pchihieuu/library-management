import { IAuthor } from './author.interface';
import { ICategory } from './category.interface';

export interface IBook {
  BookID: string;
  Title: string;
  PublicationYear?: number;
  ISBN: string;
  Description?: string;
  AuthorBook: string;
  CategoryBook: string;
  authors: IAuthor[];
  categories: ICategory[];
  //   borrowings: IBorrowing[];
}
