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
exports.GenericController = void 0;
class GenericController {
    constructor(service) {
        this.findMany = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield this.service.findAll();
                res.status(200).json(items);
            }
            catch (error) {
                next(error);
            }
        });
        this.findOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this.service.findById(req.params.id);
                if (!item) {
                    return res.status(404).json({ message: 'Item not found' });
                }
                res.status(200).json(item);
            }
            catch (error) {
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this.service.create(req.body);
                res.status(201).json(item);
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this.service.update(req.params.id, req.body);
                if (!item) {
                    return res.status(404).json({ message: 'Item not found' });
                }
                res.status(200).json(item);
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield this.service.delete(req.params.id);
                if (!deleted) {
                    return res.status(404).json({ message: 'Item not found' });
                }
                res.status(200).json({ message: 'Item deleted successfully' });
            }
            catch (error) {
                next(error);
            }
        });
        this.service = service;
    }
}
exports.GenericController = GenericController;
