import { Book } from "../../models/book.entity";
import { Borrowing } from "../../models/borrowing.entity";
import { BorrowingService } from "../../services/borrowing.service";

jest.mock('../../models/book.entity');
jest.mock('../../models/borrowing.entity');

describe('BorrowingService', () => {
  let borrowingService: BorrowingService;
  let mockBook: any;
  let mockBorrowing: any;

  beforeEach(() => {
    borrowingService = new BorrowingService();
    mockBook = Book as jest.Mocked<typeof Book>;
    mockBorrowing = Borrowing as jest.Mocked<typeof Borrowing>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('borrowBook', () => {
    it('should successfully borrow a book when available', async () => {
      const userId = 'user123';
      const bookId = 'book123';
      const mockBookData = {
        AvailableCopies: 1,
        Status: 'available',
        save: jest.fn(),
      };
      
      mockBook.findByPk.mockResolvedValue(mockBookData);

      mockBorrowing.create.mockResolvedValue({
        UserID: userId,
        BookID: bookId,
        BorrowDate: new Date(),
        DueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
        Renewed: false,
      });

      const result = await borrowingService.borrowBook(userId, bookId);

      expect(result.UserID).toBe(userId);
      expect(result.BookID).toBe(bookId);
      expect(mockBookData.save).toHaveBeenCalledTimes(1);  
      expect(mockBorrowing.create).toHaveBeenCalledTimes(1);
    });

    it('should throw error if book is not found', async () => {
      const userId = 'user123';
      const bookId = 'book123';

      mockBook.findByPk.mockResolvedValue(null);

      await expect(borrowingService.borrowBook(userId, bookId)).rejects.toThrow('Book not found.');
    });

    it('should throw error if book is not available for borrowing', async () => {
      const userId = 'user123';
      const bookId = 'book123';
      const mockBookData = {
        AvailableCopies: 0,
        Status: 'borrowed',
        save: jest.fn(),
      };

      mockBook.findByPk.mockResolvedValue(mockBookData);

      await expect(borrowingService.borrowBook(userId, bookId)).rejects.toThrow('Book is not available for borrowing.');
    });
  });

  interface MockBorrowing {
    UserID: string;
    BookID: string;
    ReturnDate: Date | null;
    update: jest.Mock;
  }
  
  describe('returnBook', () => {
    it('should successfully return a book', async () => {
      const userId = 'user123';
      const bookId = 'book123';
  
      const mockBorrowingData: MockBorrowing[] = [
        {
          UserID: userId,
          BookID: bookId,
          ReturnDate: null,
          update: jest.fn().mockImplementation((updateData: any) => {
            mockBorrowingData[0].ReturnDate = updateData.ReturnDate;
            return mockBorrowingData[0];
          }),
        },
      ];
  
      const mockBookData = {
        AvailableCopies: 0,
        Status: 'borrowed',
        save: jest.fn(),
      };

      mockBook.findByPk.mockResolvedValue(mockBookData);
      mockBorrowing.findAll.mockResolvedValue(mockBorrowingData);
  
      const result = await borrowingService.returnBook(userId, bookId);
  
      expect(result.ReturnDate).not.toBeNull(); 
      expect(result.ReturnDate).toBeInstanceOf(Date); 
      expect(mockBookData.save).toHaveBeenCalledTimes(1); 
      expect(mockBorrowingData[0].update).toHaveBeenCalledTimes(1);
    });
  
    it('should throw error if borrowing record not found', async () => {
      const userId = 'user123';
      const bookId = 'book123';
  
      mockBorrowing.findAll.mockResolvedValue([]);
  
      await expect(borrowingService.returnBook(userId, bookId)).rejects.toThrow('Borrowing record not found or book already returned.');
    });
  
    it('should throw error if book is not found during return', async () => {
      const userId = 'user123';
      const bookId = 'book123';
  
      const mockBorrowingData: MockBorrowing[] = [
        {
          UserID: userId,
          BookID: bookId,
          ReturnDate: null,
          update: jest.fn(),
        },
      ];
  
      mockBorrowing.findAll.mockResolvedValue(mockBorrowingData);
      mockBook.findByPk.mockResolvedValue(null);
  
      await expect(borrowingService.returnBook(userId, bookId)).rejects.toThrow('Book not found.');
    });
  });
  
});
