import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { Book } from '../models/book.entity';
import { Author } from '../models/author.entity';
import { BooksAuthors } from '../models/booksauthor.entity';
import { BooksCategories } from '../models/bookscategory.entity';
import { Borrowing } from '../models/borrowing.entity';
import { Category } from '../models/category.entity';
import { User } from '../models/user.entity';

// Load environment variables từ file .env
dotenv.config();

class Database {
  public sequelize: Sequelize | undefined; // Sequelize instance sẽ được khởi tạo trong hàm connectToPostgreSQL

  constructor() {
    this.connectToPostgreSQL(); // Tự động kết nối PostgreSQL khi lớp được khởi tạo
  }

  private async connectToPostgreSQL() {
    // Lấy URL kết nối từ file .env
    const { POSTGRES_URL } = process.env;

    if (!POSTGRES_URL) {
      console.error('❌ POSTGRES_URL is missing in environment variables.');
      return;
    }

    try {
      // Khởi tạo Sequelize với các cài đặt cần thiết
      this.sequelize = new Sequelize(POSTGRES_URL, {
        dialect: 'postgres',
        dialectOptions: {
          ssl: {
            require: true, // Vercel yêu cầu SSL kết nối
            rejectUnauthorized: false, // Cho phép chứng chỉ tự ký
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
        ], // Tự động ánh xạ các model
      });

      // Kiểm tra kết nối đến cơ sở dữ liệu
      await this.sequelize.authenticate();
      console.log('✅ PostgreSQL Connection has been established successfully.');
    } catch (err: any) {
      console.error('❌ Unable to connect to the PostgreSQL database:', err.message);
    }
  }
}

export default Database;
