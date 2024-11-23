import { Request, Response } from "express";
import { BorrowingService } from "../services/borrowing.service";
import { BorrowingDto } from "../common/dtos/borrowing.dto";

export class BorrowingController {
  private borrowingService: BorrowingService;

  constructor() {
    this.borrowingService = new BorrowingService();
  }


  borrowBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const borrowingDto: BorrowingDto = req.body;
      const newBorrowing = await this.borrowingService.borrowBook(borrowingDto);
      res.status(201).json(newBorrowing);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };

  returnBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const { borrowingId } = req.params;
      const updatedBorrowing = await this.borrowingService.returnBook(borrowingId);
      res.status(200).json(updatedBorrowing);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };

  renewBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const { borrowingId } = req.params;
      const { newDueDate } = req.body;
      const updatedBorrowing = await this.borrowingService.renewBook(borrowingId, newDueDate);
      res.status(200).json(updatedBorrowing);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };
}
