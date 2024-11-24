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
exports.BookDto = void 0;
const class_validator_1 = require("class-validator");
const author_dto_1 = require("./author.dto");
const category_dto_1 = require("./category.dto");
class BookDto {
    constructor(book) {
        this.authors = [];
        this.categories = [];
        this.BookID = book.BookID;
        this.Title = book.Title;
        this.PublicationYear = book.PublicationYear;
        this.ISBN = book.ISBN;
        this.Description = book.Description;
        this.AuthorBook = book.AuthorBook;
        this.CategoryBook = book.CategoryBook;
        this.authors = book.authors ? book.authors.map(author => new author_dto_1.AuthorDto(author)) : [];
        this.categories = book.categories ? book.categories.map(category => new category_dto_1.CategoryDto(category)) : [];
    }
}
exports.BookDto = BookDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], BookDto.prototype, "BookID", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookDto.prototype, "Title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1900),
    __metadata("design:type", Number)
], BookDto.prototype, "PublicationYear", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookDto.prototype, "ISBN", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookDto.prototype, "AuthorBook", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookDto.prototype, "CategoryBook", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookDto.prototype, "Description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], BookDto.prototype, "deletedAt", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], BookDto.prototype, "authors", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], BookDto.prototype, "categories", void 0);
