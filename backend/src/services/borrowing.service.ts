import { Borrowing } from "../models/borrowing.entity";
import { Book } from "../models/book.entity";
import { BorrowingDto } from "../common/dtos/borrowing.dto";


export class BorrowingService {
  async borrowBook(borrowingDto: BorrowingDto): Promise<Borrowing> {
    const { UserID, BookID, BorrowDate, DueDate } = borrowingDto;

    try {
      const book = await Book.findByPk(BookID);
      if (!book) {
        throw new Error("Book not found.");
      }

      if (book.AvailableCopies <= 0) {
        throw new Error("No available copies left to borrow.");
      }

      const borrowing = await Borrowing.create({
        UserID,
        BookID,
        BorrowDate,
        DueDate,
        Renewed: false,
      });

      book.AvailableCopies -= 1;
      await book.save();

      return borrowing;
    } catch (error: any) {
      throw new Error(`Error borrowing book: ${error.message}`);
    }
  }

  async returnBook(borrowingId: string): Promise<Borrowing> {
    try {
      const borrowing = await Borrowing.findByPk(borrowingId);
      if (!borrowing) {
        throw new Error("Borrowing record not found.");
      }

      if (borrowing.ReturnDate) {
        throw new Error("Book has already been returned.");
      }
      
      borrowing.ReturnDate = new Date();

      const book = await Book.findByPk(borrowing.BookID);
      if (book) {
        book.AvailableCopies += 1;
        await book.save();
      }

      await borrowing.save();
      return borrowing;
    } catch (error: any) {
      throw new Error(`Error returning book: ${error.message}`);
    }
  }

  async renewBook(borrowingId: string, newDueDate: Date): Promise<Borrowing> {
    try {
      const borrowing = await Borrowing.findByPk(borrowingId);
      if (!borrowing) {
        throw new Error("Borrowing record not found.");
      }

      if (borrowing.ReturnDate) {
        throw new Error("Book has already been returned.");
      }

      borrowing.DueDate = newDueDate;
      borrowing.Renewed = true;

      await borrowing.save();
      return borrowing;
    } catch (error: any) {
      throw new Error(`Error renewing book: ${error.message}`);
    }
  }
}
