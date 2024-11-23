"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_service_1 = require("../services/book.service");
const generic_controller_1 = require("./generic.controller");
class BookController extends generic_controller_1.GenericController {
    constructor() {
        super(new book_service_1.BookService());
    }
}
exports.BookController = BookController;
