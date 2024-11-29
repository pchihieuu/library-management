import { IBook } from './book.interface';

export interface ICategory {
  CategoryID: string;
  CategoryName: string;
  Description?: string;
  books?: IBook[];
}
