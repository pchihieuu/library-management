import { IBook } from './book.interface';
import { IUser } from './user.interface';

export interface IBorrowing {
  BorrowingID: string;
  UserID: string;
  BookID: string;
  BorrowDate: Date;
  DueDate: Date;
  ReturnDate?: Date;
  Renewed: boolean;
  user?: IUser;
  book?: IBook;
}
