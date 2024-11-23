
import validate from "../common/helpers/validate";
import { UserController } from "../controllers/user.controller";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import BaseRoutes from "./base/base.route";

class UserRoutes extends BaseRoutes {
  private userController: UserController;

  constructor() {
    super();
    this.userController = new UserController(); 
    this.routes = this.routes.bind(this);
    this.router.get("", this.userController.findMany.bind(this.userController));
    this.router.get("/:id", this.userController.findOne.bind(this.userController));
    this.router.post("",validate(createUserSchema), this.userController.create.bind(this.userController));
    this.router.patch("/:id",validate(updateUserSchema), this.userController.update.bind(this.userController));
    this.router.delete("/:id", this.userController.delete.bind(this.userController));
  }

  public routes(): void {
    // Define the routes for this subclass
  }
}

export default new UserRoutes().router;  
