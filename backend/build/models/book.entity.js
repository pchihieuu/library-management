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
exports.Book = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const author_entity_1 = require("./author.entity");
const category_entity_1 = require("./category.entity");
const booksauthor_entity_1 = require("./booksauthor.entity");
const bookscategory_entity_1 = require("./bookscategory.entity");
const borrowing_entity_1 = require("./borrowing.entity");
let Book = class Book extends sequelize_typescript_1.Model {
};
exports.Book = Book;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    __metadata("design:type", String)
], Book.prototype, "BookID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Book.prototype, "Title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        validate: { min: 1900 },
    }),
    __metadata("design:type", Number)
], Book.prototype, "PublicationYear", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        unique: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Book.prototype, "ISBN", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Book.prototype, "Description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: 0,
    }),
    __metadata("design:type", Number)
], Book.prototype, "TotalCopies", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: 0,
    }),
    __metadata("design:type", Number)
], Book.prototype, "AvailableCopies", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('available', 'borrowed', 'reserved'),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Book.prototype, "Status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Book.prototype, "AuthorBook", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Book.prototype, "CategoryBook", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: 'deletedAt',
    }),
    __metadata("design:type", Date)
], Book.prototype, "deletedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => author_entity_1.Author, () => booksauthor_entity_1.BooksAuthors),
    __metadata("design:type", Array)
], Book.prototype, "authors", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => category_entity_1.Category, () => bookscategory_entity_1.BooksCategories),
    __metadata("design:type", Array)
], Book.prototype, "categories", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => borrowing_entity_1.Borrowing),
    __metadata("design:type", Array)
], Book.prototype, "borrowings", void 0);
exports.Book = Book = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "Books",
        paranoid: true,
    })
], Book);
