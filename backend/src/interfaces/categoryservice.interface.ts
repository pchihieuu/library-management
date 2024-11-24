import { Category } from '../models/category.entity';

export interface ICategoryService {
  create(category: Category): Promise<Category>;
  update(category: Category): Promise<Category>;
  delete(categoryId: string): Promise<void>;
  findById(categoryId: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  findBySlug(slug: string): Promise<Category | null>;
}
