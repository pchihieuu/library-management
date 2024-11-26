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

  constructor() {
    this.connectToPostgreSQL(); 
  }

  private async connectToPostgreSQL() {
    const { POSTGRES_URL } = process.env;

    if (!POSTGRES_URL) {
      console.error('❌ POSTGRES_URL is missing in environment variables.');
      return;
    }

    try {
      this.sequelize = new Sequelize(POSTGRES_URL, {
        dialect: 'postgres',
        dialectOptions: {
          ssl: {
            require: true, 
            rejectUnauthorized: false,
          },
        },
        models: [
          Book,
          Author,
          BooksAuthors,
          BooksCategories,
          Borrowing,
          Category,
          User,
        ],
      });

      await this.sequelize.authenticate();
      console.log('✅ PostgreSQL Connection has been established successfully.');
    } catch (err: any) {
      console.error('❌ Unable to connect to the PostgreSQL database:', err.message);
    }
  }
}

export default Database;
