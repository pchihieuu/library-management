import { Category } from '../models/category.entity';
import { GenericService } from './generic.service';

export class CategoryService extends GenericService<Category> {
  constructor() {
    super(Category);
  }
  async findBySlug(slug: string): Promise<Category | null> {
    return Category.findOne({ where: { slug } });
  }
}
