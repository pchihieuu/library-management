import { Borrowing } from '../models/borrowing.entity';
import { Book } from '../models/book.entity';
import { GenericService } from './generic.service';

export class BorrowingService extends GenericService<Borrowing> {
  constructor() {
    super(Borrowing);
  }

  async borrowBook(userId: string, bookId: string): Promise<Borrowing> {
    const book = await Book.findByPk(bookId);

    if (!book) {
      throw new Error('Book not found.');
    }

    if (book.AvailableCopies <= 0 || book.Status !== 'available') {
      throw new Error('Book is not available for borrowing.');
    }

    const borrowing = await this.create({
      UserID: userId,
      BookID: bookId,
      BorrowDate: new Date(),
      DueDate: new Date(new Date().setDate(new Date().getDate() + 14)), // 14 ngày
      Renewed: false,
    });

    book.AvailableCopies -= 1;
    if (book.AvailableCopies === 0) {
      book.Status = 'borrowed';
    }
    await book.save();

    return borrowing;
  }

  async returnBook(userId: string, bookId: string): Promise<Borrowing> {
    const borrowing = await this.findAll({
      where: {
        UserID: userId,
        BookID: bookId,
        ReturnDate: null, 
      },
    });

    if (borrowing.length === 0) {
      throw new Error('Borrowing record not found or book already returned.');
    }

    const book = await Book.findByPk(bookId);

    if (!book) {
      throw new Error('Book not found.');
    }

    const currentBorrowing = borrowing[0];
    await currentBorrowing.update({ ReturnDate: new Date() });

    book.AvailableCopies += 1;
    if (book.Status === 'borrowed' && book.AvailableCopies > 0) {
      book.Status = 'available';
    }
    await book.save();

    return currentBorrowing;
  }
}
