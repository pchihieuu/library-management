import { Book } from '../models/book.entity';
import { GenericService } from './generic.service';

export class BookService extends GenericService<Book> {
  constructor() {
    super(Book);
  }

  async findByTitle(title: string): Promise<Book[]> {
    try {
      const authors = await this.findAll({
        where: {
          Title: title,
        },
      });
      return authors;
    } catch (error) {
      throw new Error(`Error while retrieving book by title: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
