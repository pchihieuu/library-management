"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("../services/category.service");
const generic_controller_1 = require("./generic.controller");
class CategoryController extends generic_controller_1.GenericController {
    constructor() {
        super(new category_service_1.CategoryService());
    }
}
exports.CategoryController = CategoryController;
