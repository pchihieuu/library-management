import express, { Request, Response } from 'express';
import { BorrowingController } from '../controllers/borrowing.controller';

class BorrowingRoutes {
  public router = express.Router();
  private borrowingController: BorrowingController;

  constructor() {
    this.borrowingController = new BorrowingController();
    this.initRoutes();
  }

  /**
   * Initialize all routes for Borrowing
   */
  private initRoutes(): void {
    this.router.post('/borrow', this.borrowBookHandler.bind(this));
    this.router.post('/return', this.returnBookHandler.bind(this));
  }

  /**
   * Handler for borrowing a book
   */
  private borrowBookHandler(req: Request, res: Response): void {
    this.borrowingController.borrowBook(req, res);
  }

  /**
   * Handler for returning a book
   */
  private returnBookHandler(req: Request, res: Response): void {
    this.borrowingController.returnBook(req, res);
  }
}

export default new BorrowingRoutes().router;
