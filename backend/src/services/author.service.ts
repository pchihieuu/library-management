import { Author } from '../models/author.entity';
import { GenericService } from './generic.service';

export class AuthorService extends GenericService<Author> {
  constructor() {
    super(Author);
  }

  async findByName(fullName: string): Promise<Author[]> {
    try {
      const authors = await this.findAll({
        where: {
          FullName: fullName,
        },
      });
      return authors;
    } catch (error) {
      throw new Error(`Error while retrieving authors by name: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
