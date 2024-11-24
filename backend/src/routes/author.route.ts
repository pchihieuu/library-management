import validate from '../common/helpers/validate';
import AuthorController from '../controllers/author.controller';
import { createAuthorSchema, updateAuthorSchema } from '../schemas/author.schema';
import BaseRoutes from './base/base.route';

class AuthorRoutes extends BaseRoutes {
  private authorController: AuthorController;

  constructor() {
    super();
    this.authorController = new AuthorController();
    this.routes = this.routes.bind(this);
    this.router.get('', this.authorController.findMany.bind(this.authorController));
    this.router.get('/:id', this.authorController.findOne.bind(this.authorController));
    this.router.post('', validate(createAuthorSchema), this.authorController.create.bind(this.authorController));
    this.router.patch('/:id', validate(updateAuthorSchema), this.authorController.update.bind(this.authorController));
    this.router.delete('/:id', this.authorController.delete.bind(this.authorController));
  }

  public routes(): void {
    // Define the routes for this subclass
  }
}

export default new AuthorRoutes().router;
