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
exports.AuthorService = void 0;
const author_entity_1 = require("../models/author.entity");
const generic_service_1 = require("./generic.service");
class AuthorService extends generic_service_1.GenericService {
    constructor() {
        super(author_entity_1.Author);
    }
    findByName(fullName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authors = yield this.findAll({
                    where: {
                        FullName: fullName,
                    },
                });
                return authors;
            }
            catch (error) {
                throw new Error(`Error while retrieving authors by name: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        });
    }
}
exports.AuthorService = AuthorService;
