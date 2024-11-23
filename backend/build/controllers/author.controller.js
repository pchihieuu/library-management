"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const author_service_1 = require("../services/author.service");
const generic_controller_1 = require("./generic.controller");
class AuthorController extends generic_controller_1.GenericController {
    constructor() {
        const authorService = new author_service_1.AuthorService();
        super(authorService);
    }
}
exports.default = AuthorController;
