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
exports.GenericService = void 0;
class GenericService {
    constructor(model) {
        this.model = model;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.model.create(data);
                return entity;
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
            }
        });
    }
    findAll(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entities = yield this.model.findAll(options);
                return entities;
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.model.findByPk(id);
                return entity;
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.model.findByPk(id);
                if (!entity) {
                    return null;
                }
                yield entity.update(data);
                return entity;
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.model.findByPk(id);
                if (!entity) {
                    return false;
                }
                yield entity.destroy();
                return true;
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
            }
        });
    }
}
exports.GenericService = GenericService;
