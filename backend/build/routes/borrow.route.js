"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrowing_controller_1 = require("../controllers/borrowing.controller");
class BorrowingRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.borrowingController = new borrowing_controller_1.BorrowingController();
        this.initRoutes();
    }
    /**
     * Initialize all routes for Borrowing
     */
    initRoutes() {
        this.router.post('/borrow', this.borrowBookHandler.bind(this));
        this.router.post('/return', this.returnBookHandler.bind(this));
    }
    /**
     * Handler for borrowing a book
     */
    borrowBookHandler(req, res) {
        this.borrowingController.borrowBook(req, res);
    }
    /**
     * Handler for returning a book
     */
    returnBookHandler(req, res) {
        this.borrowingController.returnBook(req, res);
    }
}
exports.default = new BorrowingRoutes().router;
