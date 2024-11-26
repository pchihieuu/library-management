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
exports.BorrowingService = void 0;
const borrowing_entity_1 = require("../models/borrowing.entity");
const book_entity_1 = require("../models/book.entity");
const generic_service_1 = require("./generic.service");
class BorrowingService extends generic_service_1.GenericService {
    constructor() {
        super(borrowing_entity_1.Borrowing);
    }
    borrowBook(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield book_entity_1.Book.findByPk(bookId);
            if (!book) {
                throw new Error('Book not found.');
            }
            if (book.AvailableCopies <= 0 || book.Status !== 'available') {
                throw new Error('Book is not available for borrowing.');
            }
            const borrowing = yield this.create({
                UserID: userId,
                BookID: bookId,
                BorrowDate: new Date(),
                DueDate: new Date(new Date().setDate(new Date().getDate() + 14)), // 14 ngày
                Renewed: false,
            });
            book.AvailableCopies -= 1;
            if (book.AvailableCopies === 0) {
                book.Status = 'borrowed';
            }
            yield book.save();
            return borrowing;
        });
    }
    returnBook(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const borrowing = yield this.findAll({
                where: {
                    UserID: userId,
                    BookID: bookId,
                    ReturnDate: null,
                },
            });
            if (borrowing.length === 0) {
                throw new Error('Borrowing record not found or book already returned.');
            }
            const book = yield book_entity_1.Book.findByPk(bookId);
            if (!book) {
                throw new Error('Book not found.');
            }
            const currentBorrowing = borrowing[0];
            yield currentBorrowing.update({ ReturnDate: new Date() });
            book.AvailableCopies += 1;
            if (book.Status === 'borrowed' && book.AvailableCopies > 0) {
                book.Status = 'available';
            }
            yield book.save();
            return currentBorrowing;
        });
    }
}
exports.BorrowingService = BorrowingService;
