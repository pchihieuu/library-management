import validate from '../common/helpers/validate';
import AuthorController from '../controllers/author.controller';
import { CategoryController } from '../controllers/category.controller';
import { createCategorySchema, updateCategorySchema } from '../schemas/category.schema';
import BaseRoutes from './base/base.route';

class CategoryRoutes extends BaseRoutes {
  private categoryController: CategoryController;

  constructor() {
    super();
    this.categoryController = new CategoryController();
    this.routes = this.routes.bind(this);
    this.router.get('', this.categoryController.findMany.bind(this.categoryController));
    this.router.get('/:id', this.categoryController.findOne.bind(this.categoryController));
    this.router.post('', validate(createCategorySchema), this.categoryController.create.bind(this.categoryController));
    this.router.patch('/:id', validate(updateCategorySchema), this.categoryController.update.bind(this.categoryController));
    this.router.delete('/:id', this.categoryController.delete.bind(this.categoryController));
  }

  public routes(): void {
    // Define the routes for this subclass
  }
}

export default new CategoryRoutes().router;
