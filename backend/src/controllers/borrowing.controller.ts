import { Request, Response } from 'express';
import { BorrowingService } from '../services/borrowing.service';

export class BorrowingController {
  private borrowingService: BorrowingService;

  constructor() {
    this.borrowingService = new BorrowingService();
  }

  async borrowBook(req: Request, res: Response): Promise<void> {
    const { userId, bookId } = req.body;

    try {
      const borrowing = await this.borrowingService.borrowBook(userId, bookId);
      res.status(200).json({
        message: 'Book borrowed successfully',
        data: borrowing,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async returnBook(req: Request, res: Response): Promise<void> {
    const { userId, bookId } = req.body;

    try {
      const borrowing = await this.borrowingService.returnBook(userId, bookId);
      res.status(200).json({
        message: 'Book returned successfully',
        data: borrowing,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
