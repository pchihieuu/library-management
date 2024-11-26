"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorDto = void 0;
const class_validator_1 = require("class-validator");
const book_dto_1 = require("./book.dto");
class AuthorDto {
    constructor(author) {
        var _a;
        this.books = [];
        this.AuthorID = author.AuthorID;
        this.FullName = author.FullName;
        this.Bio = author.Bio;
        this.books = (_a = author.books) === null || _a === void 0 ? void 0 : _a.map(book => new book_dto_1.BookDto(book));
    }
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AuthorDto.prototype, "AuthorID", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthorDto.prototype, "FullName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthorDto.prototype, "Bio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AuthorDto.prototype, "books", void 0);
exports.AuthorDto = AuthorDto;
