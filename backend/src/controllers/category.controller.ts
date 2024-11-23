import { Category } from "../models/category.entity";
import { CategoryService } from "../services/category.service";
import { GenericController } from "./generic.controller";


export class CategoryController extends GenericController<Category> {
  constructor() {
    super(new CategoryService());
  }

}
