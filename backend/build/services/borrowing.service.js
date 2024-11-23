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
class BorrowingService {
    borrowBook(borrowingDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { UserID, BookID, BorrowDate, DueDate } = borrowingDto;
            try {
                const book = yield book_entity_1.Book.findByPk(BookID);
                if (!book) {
                    throw new Error("Book not found.");
                }
                if (book.AvailableCopies <= 0) {
                    throw new Error("No available copies left to borrow.");
                }
                const borrowing = yield borrowing_entity_1.Borrowing.create({
                    UserID,
                    BookID,
                    BorrowDate,
                    DueDate,
                    Renewed: false,
                });
                book.AvailableCopies -= 1;
                yield book.save();
                return borrowing;
            }
            catch (error) {
                throw new Error(`Error borrowing book: ${error.message}`);
            }
        });
    }
    returnBook(borrowingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const borrowing = yield borrowing_entity_1.Borrowing.findByPk(borrowingId);
                if (!borrowing) {
                    throw new Error("Borrowing record not found.");
                }
                if (borrowing.ReturnDate) {
                    throw new Error("Book has already been returned.");
                }
                borrowing.ReturnDate = new Date();
                const book = yield book_entity_1.Book.findByPk(borrowing.BookID);
                if (book) {
                    book.AvailableCopies += 1;
                    yield book.save();
                }
                yield borrowing.save();
                return borrowing;
            }
            catch (error) {
                throw new Error(`Error returning book: ${error.message}`);
            }
        });
    }
    renewBook(borrowingId, newDueDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const borrowing = yield borrowing_entity_1.Borrowing.findByPk(borrowingId);
                if (!borrowing) {
                    throw new Error("Borrowing record not found.");
                }
                if (borrowing.ReturnDate) {
                    throw new Error("Book has already been returned.");
                }
                borrowing.DueDate = newDueDate;
                borrowing.Renewed = true;
                yield borrowing.save();
                return borrowing;
            }
            catch (error) {
                throw new Error(`Error renewing book: ${error.message}`);
            }
        });
    }
}
exports.BorrowingService = BorrowingService;
