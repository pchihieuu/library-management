import express, { Application, Request, Response } from 'express';

import Database from './config/database';
import { corsMiddleware, queryMiddleware, errorMiddleware } from './middlewares';
import authorRoute from './routes/author.route';
import categoryRoute from './routes/category.route';
import userRoute from './routes/user.route';
import bookRoute from './routes/book.route';
import borrowRoute from './routes/borrow.route';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    this.databaseSync();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(corsMiddleware);

    this.app.use(queryMiddleware);
    this.app.use(errorMiddleware);
  }

  protected async databaseSync(): Promise<void> {
    const db = new Database();
    try {
      await db.sequelize?.sync({ alter: true});
      console.log('🚀 Database synchronized successfully.');
    } catch (error) {
      console.error('❌ Failed to sync the database:', error);
      process.exit(1);
    }
  }

  protected routes(): void {
    this.app.route('/').get((req: Request, res: Response) => {
      res.send('welcome home');
    });
    this.app.use('/api/v1/authors', authorRoute);
    this.app.use('/api/v1/borrowing', borrowRoute);
    this.app.use('/api/v1/books', bookRoute);
    this.app.use('/api/v1/users', userRoute);
    this.app.use('/api/v1/categories', categoryRoute);
  }
}

const port: number = 5000;
const app = new App().app;

app.listen(port, () => {
  console.log(`🚀 Server started successfully on port ${port}!`);
});
