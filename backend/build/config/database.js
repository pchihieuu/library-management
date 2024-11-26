"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv = __importStar(require("dotenv"));
const book_entity_1 = require("../models/book.entity");
const author_entity_1 = require("../models/author.entity");
const booksauthor_entity_1 = require("../models/booksauthor.entity");
const bookscategory_entity_1 = require("../models/bookscategory.entity");
const borrowing_entity_1 = require("../models/borrowing.entity");
const category_entity_1 = require("../models/category.entity");
const user_entity_1 = require("../models/user.entity");
dotenv.config();
class Database {
    constructor() {
        // Fetching environment variables with proper types
        this.POSTGRES_DB = process.env.POSTGRES_DB || '';
        this.POSTGRES_HOST = process.env.POSTGRES_HOST || '';
        this.POSTGRES_PORT = Number(process.env.POSTGRES_PORT) || 5432; // Default to 5432 if no port is specified
        this.POSTGRES_USER = process.env.POSTGRES_USER || '';
        this.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '';
        // Initialize the database connection
        this.connectToPostgreSQL();
    }
    connectToPostgreSQL() {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the required environment variables are available
            if (!this.POSTGRES_DB || !this.POSTGRES_HOST || !this.POSTGRES_USER || !this.POSTGRES_PASSWORD) {
                console.error('❌ Missing required environment variables.');
                return;
            }
            // Initialize Sequelize instance
            this.sequelize = new sequelize_typescript_1.Sequelize({
                database: this.POSTGRES_DB,
                username: this.POSTGRES_USER,
                password: this.POSTGRES_PASSWORD,
                host: this.POSTGRES_HOST,
                port: this.POSTGRES_PORT,
                dialect: 'postgres',
                models: [book_entity_1.Book, author_entity_1.Author, booksauthor_entity_1.BooksAuthors, bookscategory_entity_1.BooksCategories, borrowing_entity_1.Borrowing, category_entity_1.Category, user_entity_1.User],
            });
            // Authenticate the connection
            try {
                yield this.sequelize.authenticate();
                console.log('✅ PostgreSQL Connection has been established successfully.');
            }
            catch (err) {
                console.error('❌ Unable to connect to the PostgreSQL database:', err);
            }
        });
    }
}
exports.default = Database;
