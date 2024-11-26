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
exports.BorrowingController = void 0;
const borrowing_service_1 = require("../services/borrowing.service");
class BorrowingController {
    constructor() {
        this.borrowingService = new borrowing_service_1.BorrowingService();
    }
    borrowBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, bookId } = req.body;
            try {
                const borrowing = yield this.borrowingService.borrowBook(userId, bookId);
                res.status(200).json({
                    message: 'Book borrowed successfully',
                    data: borrowing,
                });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    returnBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, bookId } = req.body;
            try {
                const borrowing = yield this.borrowingService.returnBook(userId, bookId);
                res.status(200).json({
                    message: 'Book returned successfully',
                    data: borrowing,
                });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.BorrowingController = BorrowingController;
