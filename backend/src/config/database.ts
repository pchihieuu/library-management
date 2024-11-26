import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { Book } from '../models/book.entity';
import { Author } from '../models/author.entity';
import { BooksAuthors } from '../models/booksauthor.entity';
import { BooksCategories } from '../models/bookscategory.entity';
import { Borrowing } from '../models/borrowing.entity';
import { Category } from '../models/category.entity';
import { User } from '../models/user.entity';

dotenv.config();

class Database {
  public sequelize: Sequelize | undefined;

  private POSTGRES_DB: string;
  private POSTGRES_HOST: string;
  private POSTGRES_PORT: number;
  private POSTGRES_USER: string;
  private POSTGRES_PASSWORD: string;

  constructor() {
    // Fetching environment variables with proper types
    this.POSTGRES_DB = process.env.POSTGRES_DB || '';
    this.POSTGRES_HOST = process.env.POSTGRES_HOST || '';
    this.POSTGRES_PORT = Number(process.env.POSTGRES_PORT) || 5432; // Default to 5432 if no port is specified
    this.POSTGRES_USER = process.env.POSTGRES_USER || '';
    this.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '';

    // Initialize the database connection
    this.connectToPostgreSQL();
  }

  private async connectToPostgreSQL() {
    // Check if the required environment variables are available
    if (!this.POSTGRES_DB || !this.POSTGRES_HOST || !this.POSTGRES_USER || !this.POSTGRES_PASSWORD) {
      console.error('❌ Missing required environment variables.');
      return;
    }

    // Initialize Sequelize instance
    this.sequelize = new Sequelize({
      database: this.POSTGRES_DB,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      host: this.POSTGRES_HOST,
      port: this.POSTGRES_PORT,
      dialect: 'postgres',
      models: [Book, Author, BooksAuthors, BooksCategories, Borrowing, Category, User],
    });

    // Authenticate the connection
    try {
      await this.sequelize.authenticate();
      console.log('✅ PostgreSQL Connection has been established successfully.');
    } catch (err) {
      console.error('❌ Unable to connect to the PostgreSQL database:', err);
    }
  }
}

export default Database;
