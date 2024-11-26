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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const middlewares_1 = require("./middlewares");
const author_route_1 = __importDefault(require("./routes/author.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const borrow_route_1 = __importDefault(require("./routes/borrow.route"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.plugins();
        this.routes();
        this.databaseSync();
    }
    plugins() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(middlewares_1.corsMiddleware);
        this.app.use(middlewares_1.queryMiddleware);
        this.app.use(middlewares_1.errorMiddleware);
    }
    databaseSync() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const db = new database_1.default();
            try {
                yield ((_a = db.sequelize) === null || _a === void 0 ? void 0 : _a.sync());
                console.log('🚀 Database synchronized successfully.');
            }
            catch (error) {
                console.error('❌ Failed to sync the database:', error);
                process.exit(1);
            }
        });
    }
    routes() {
        this.app.route('/').get((req, res) => {
            res.send('welcome home');
        });
        this.app.use('/api/v1/authors', author_route_1.default);
        this.app.use('/api/v1/borrowing', borrow_route_1.default);
        this.app.use('/api/v1/books', book_route_1.default);
        this.app.use('/api/v1/users', user_route_1.default);
        this.app.use('/api/v1/categories', category_route_1.default);
    }
}
const port = 8000;
const app = new App().app;
app.listen(port, () => {
    console.log(`🚀 Server started successfully on port ${port}!`);
});
