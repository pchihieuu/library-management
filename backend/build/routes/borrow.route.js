"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/borrowing.routes.ts
const borrowing_controller_1 = require("../controllers/borrowing.controller");
const base_route_1 = __importDefault(require("./base/base.route"));
class BorrowingRoutes extends base_route_1.default {
    constructor() {
        super();
        this.borrowingController = new borrowing_controller_1.BorrowingController();
        this.routes = this.routes.bind(this);
        this.router.post("/borrow", this.borrowingController.borrowBook.bind(this.borrowingController));
        this.router.put("/return/:borrowingId", this.borrowingController.returnBook.bind(this.borrowingController));
        this.router.put("/renew/:borrowingId", this.borrowingController.renewBook.bind(this.borrowingController));
    }
    routes() {
        // All the routes are already defined in the constructor, so nothing needed here
    }
}
exports.default = new BorrowingRoutes().router;
