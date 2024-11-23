import { AuthorService } from "../services/author.service";
import { GenericController } from "./generic.controller";  
import { Author } from "../models/author.entity";
 
class AuthorController extends GenericController<Author> {
  constructor() {
    const authorService = new AuthorService();
    super(authorService);
  }
}

export default AuthorController;
