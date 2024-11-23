"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const category_entity_1 = require("../models/category.entity");
const generic_service_1 = require("./generic.service");
class CategoryService extends generic_service_1.GenericService {
    constructor() {
        super(category_entity_1.Category);
    }
    findBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            return category_entity_1.Category.findOne({ where: { slug } });
        });
    }
}
exports.CategoryService = CategoryService;
