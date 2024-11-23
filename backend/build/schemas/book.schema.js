"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookSchema = exports.createBookSchema = void 0;
const zod_1 = require("zod");
exports.createBookSchema = zod_1.z.object({
    body: zod_1.z.object({
        Title: zod_1.z.string().min(1, { message: 'Title must be greater than 1 characters!' }),
        PublicationYear: zod_1.z.number().min(100, { message: 'PublicationYear must be greater than' }),
        ISBN: zod_1.z.string().min(1, { message: 'ISBN must be provided!' }),
        TotalCopies: zod_1.z.number().int().min(0, { message: 'Total copies must be at least 0!' }),
        AvailableCopies: zod_1.z.number().int().min(0, { message: 'Available copies must be at least 0!' }),
        Status: zod_1.z.enum(['available', 'borrowed', 'reserved'], {
            errorMap: () => ({ message: "Status must be one of 'available', 'borrowed', or 'reserved'!" }),
        }),
        AuthorBook: zod_1.z.string().min(1, { message: 'Author is required!' }),
        CategoryBook: zod_1.z.string().min(1, { message: 'Category is required!' }),
        Description: zod_1.z.string().optional(),
    }),
});
exports.updateBookSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    body: zod_1.z
        .object({
        Title: zod_1.z.string().min(1, { message: 'Title must be greater than 1 characters!' }).optional(),
        PublicationYear: zod_1.z.number().min(100, { message: 'PublicationYear must be greater than' }).optional(),
        ISBN: zod_1.z.string().min(1, { message: 'ISBN must be provided!' }).optional(),
        TotalCopies: zod_1.z.number().int().min(0, { message: 'Total copies must be at least 0!' }).optional(),
        AvailableCopies: zod_1.z.number().int().min(0, { message: 'Available copies must be at least 0!' }).optional(),
        Status: zod_1.z
            .enum(['available', 'borrowed', 'reserved'], {
            errorMap: () => ({ message: "Status must be one of 'available', 'borrowed', or 'reserved'!" }),
        })
            .optional(),
        AuthorBook: zod_1.z.string().min(1, { message: 'Author is required!' }).optional(),
        CategoryBook: zod_1.z.string().min(1, { message: 'Category is required!' }).optional(),
        Description: zod_1.z.string().optional(),
    })
        .partial(),
});
