"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAuthorSchema = exports.createAuthorSchema = void 0;
const zod_1 = require("zod");
exports.createAuthorSchema = zod_1.z.object({
    body: zod_1.z.object({
        FullName: zod_1.z.string().min(1, { message: 'Author name must be greater than 1 characters!' }),
        Bio: zod_1.z.string().optional(),
    }),
});
exports.updateAuthorSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    body: zod_1.z
        .object({
        FullName: zod_1.z.string().min(1, { message: 'Author name must be greater than 1 characters!' }).optional(),
        Bio: zod_1.z.string().optional(),
    })
        .partial(),
});
