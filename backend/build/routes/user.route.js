"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = __importDefault(require("../common/helpers/validate"));
const user_controller_1 = require("../controllers/user.controller");
const user_schema_1 = require("../schemas/user.schema");
const base_route_1 = __importDefault(require("./base/base.route"));
class UserRoutes extends base_route_1.default {
    constructor() {
        super();
        this.userController = new user_controller_1.UserController();
        this.routes = this.routes.bind(this);
        this.router.get("", this.userController.findMany.bind(this.userController));
        this.router.get("/:id", this.userController.findOne.bind(this.userController));
        this.router.post("", (0, validate_1.default)(user_schema_1.createUserSchema), this.userController.create.bind(this.userController));
        this.router.patch("/:id", (0, validate_1.default)(user_schema_1.updateUserSchema), this.userController.update.bind(this.userController));
        this.router.delete("/:id", this.userController.delete.bind(this.userController));
    }
    routes() {
        // Define the routes for this subclass
    }
}
exports.default = new UserRoutes().router;
