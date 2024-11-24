import validate from "../common/helpers/validate";
import { BookController } from "../controllers/book.controller";
import { createBookSchema, updateBookSchema } from "../schemas/book.schema";
import BaseRoutes from "./base/base.route";

class BookRoutes extends BaseRoutes {
  private bookController: BookController;

  constructor() {
    super();
    this.bookController = new BookController();  

    this.routes = this.routes.bind(this);
    this.router.get("", this.bookController.findMany.bind(this.bookController));
    this.router.get("/:id", this.bookController.findOne.bind(this.bookController));
    this.router.post("", validate(createBookSchema),this.bookController.create.bind(this.bookController));
    this.router.patch("/:id", validate(updateBookSchema), this.bookController.update.bind(this.bookController));
    this.router.delete("/:id", this.bookController.delete.bind(this.bookController));
  }

  public routes(): void {
    // Define the routes for this subclass
  }
}

export default new BookRoutes().router; 