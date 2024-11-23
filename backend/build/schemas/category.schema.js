"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
exports.createCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        CategoryName: zod_1.z.string().min(1, { message: 'Category name must be greater than 1 characters!' }),
        Description: zod_1.z.string().optional(),
    }),
});
exports.updateCategorySchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    body: zod_1.z
        .object({
        CategoryName: zod_1.z.string().min(1, { message: 'Category name must be greater than 1 characters!' }).optional(),
        Description: zod_1.z.string().optional(),
    })
        .partial(),
});
