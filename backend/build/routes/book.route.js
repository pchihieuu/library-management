"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = __importDefault(require("../common/helpers/validate"));
const book_controller_1 = require("../controllers/book.controller");
const book_schema_1 = require("../schemas/book.schema");
const base_route_1 = __importDefault(require("./base/base.route"));
class BookRoutes extends base_route_1.default {
    constructor() {
        super();
        this.bookController = new book_controller_1.BookController();
        this.routes = this.routes.bind(this);
        this.router.get("", this.bookController.findMany.bind(this.bookController));
        this.router.get("/:id", this.bookController.findOne.bind(this.bookController));
        this.router.post("", (0, validate_1.default)(book_schema_1.createBookSchema), this.bookController.create.bind(this.bookController));
        this.router.patch("/:id", (0, validate_1.default)(book_schema_1.updateBookSchema), this.bookController.update.bind(this.bookController));
        this.router.delete("/:id", this.bookController.delete.bind(this.bookController));
    }
    routes() {
        // Define the routes for this subclass
    }
}
exports.default = new BookRoutes().router;
