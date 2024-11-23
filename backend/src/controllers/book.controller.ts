import { Book } from "../models/book.entity";
import { BookService } from "../services/book.service";
import { GenericController } from "./generic.controller";

export class BookController extends GenericController<Book> {
    constructor() {
        super(new BookService());
    }
}