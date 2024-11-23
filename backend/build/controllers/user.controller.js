"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const generic_controller_1 = require("./generic.controller");
class UserController extends generic_controller_1.GenericController {
    constructor() {
        super(new user_service_1.UserService());
    }
}
exports.UserController = UserController;
