// src/routes/borrowing.routes.ts
import { BorrowingController } from '../controllers/borrowing.controller';
import BaseRoutes from './base/base.route';

class BorrowingRoutes extends BaseRoutes {
  private borrowingController: BorrowingController;

  constructor() {
    super();
    this.borrowingController = new BorrowingController();
    this.routes = this.routes.bind(this);
    this.router.post('/borrow', this.borrowingController.borrowBook.bind(this.borrowingController));
    this.router.put('/return/:borrowingId', this.borrowingController.returnBook.bind(this.borrowingController));
    this.router.put('/renew/:borrowingId', this.borrowingController.renewBook.bind(this.borrowingController));
  }

  public routes(): void {
    // All the routes are already defined in the constructor, so nothing needed here
  }
}

export default new BorrowingRoutes().router;
