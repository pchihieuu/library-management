"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationMiddleware = (schema) => {
    return (req, res, next) => {
        console.log(req.body);
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        next();
    };
};
exports.default = validationMiddleware;
