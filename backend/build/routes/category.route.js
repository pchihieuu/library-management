"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = __importDefault(require("../common/helpers/validate"));
const category_controller_1 = require("../controllers/category.controller");
const category_schema_1 = require("../schemas/category.schema");
const base_route_1 = __importDefault(require("./base/base.route"));
class CategoryRoutes extends base_route_1.default {
    constructor() {
        super();
        this.categoryController = new category_controller_1.CategoryController();
        this.routes = this.routes.bind(this);
        this.router.get('', this.categoryController.findMany.bind(this.categoryController));
        this.router.get('/:id', this.categoryController.findOne.bind(this.categoryController));
        this.router.post('', (0, validate_1.default)(category_schema_1.createCategorySchema), this.categoryController.create.bind(this.categoryController));
        this.router.patch('/:id', (0, validate_1.default)(category_schema_1.updateCategorySchema), this.categoryController.update.bind(this.categoryController));
        this.router.delete('/:id', this.categoryController.delete.bind(this.categoryController));
    }
    routes() {
        // Define the routes for this subclass
    }
}
exports.default = new CategoryRoutes().router;
