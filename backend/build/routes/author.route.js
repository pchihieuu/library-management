"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = __importDefault(require("../common/helpers/validate"));
const author_controller_1 = __importDefault(require("../controllers/author.controller"));
const author_schema_1 = require("../schemas/author.schema");
const base_route_1 = __importDefault(require("./base/base.route"));
class AuthorRoutes extends base_route_1.default {
    constructor() {
        super();
        this.authorController = new author_controller_1.default();
        this.routes = this.routes.bind(this);
        this.router.get('', this.authorController.findMany.bind(this.authorController));
        this.router.get('/:id', this.authorController.findOne.bind(this.authorController));
        this.router.post('', (0, validate_1.default)(author_schema_1.createAuthorSchema), this.authorController.create.bind(this.authorController));
        this.router.patch('/:id', (0, validate_1.default)(author_schema_1.updateAuthorSchema), this.authorController.update.bind(this.authorController));
        this.router.delete('/:id', this.authorController.delete.bind(this.authorController));
    }
    routes() {
        // Define the routes for this subclass
    }
}
exports.default = new AuthorRoutes().router;
