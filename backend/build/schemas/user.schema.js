"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        Email: zod_1.z.string().email({ message: "Invalid email address!" }),
        FullName: zod_1.z.string().min(1, { message: "Full name is required!" }),
        Role: zod_1.z.enum(["Admin", "Member", "Guest"], {
            errorMap: () => ({ message: "Role must be 'Admin', 'Member' or 'Guest'!" })
        }),
    }),
});
exports.updateUserSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    body: zod_1.z
        .object({
        Email: zod_1.z.string().email({ message: "Invalid email address!" }).optional(),
        FullName: zod_1.z.string().min(1, { message: "Full name is required!" }).optional(),
        Role: zod_1.z.enum(["Admin", "Member", "Guest"], {
            errorMap: () => ({ message: "Role must be 'Admin', 'Member' or 'Guest'!" })
        }).optional(),
    })
        .partial(),
});
