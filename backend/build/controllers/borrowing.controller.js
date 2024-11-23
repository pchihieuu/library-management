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
        this.borrowBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const borrowingDto = req.body;
                const newBorrowing = yield this.borrowingService.borrowBook(borrowingDto);
                res.status(201).json(newBorrowing);
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
        this.returnBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { borrowingId } = req.params;
                const updatedBorrowing = yield this.borrowingService.returnBook(borrowingId);
                res.status(200).json(updatedBorrowing);
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
        this.renewBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { borrowingId } = req.params;
                const { newDueDate } = req.body;
                const updatedBorrowing = yield this.borrowingService.renewBook(borrowingId, newDueDate);
                res.status(200).json(updatedBorrowing);
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
        this.borrowingService = new borrowing_service_1.BorrowingService();
    }
}
exports.BorrowingController = BorrowingController;
