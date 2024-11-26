"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryMiddleware = (req, res, next) => {
    if (req.query) {
        Object.keys(req.query).forEach(key => {
            if (typeof req.query[key] === 'string') {
                req.query[key] = req.query[key].trim();
            }
        });
    }
    next();
};
exports.default = queryMiddleware;
