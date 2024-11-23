"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_entity_1 = require("../models/user.entity");
const generic_service_1 = require("./generic.service");
class UserService extends generic_service_1.GenericService {
    constructor() {
        super(user_entity_1.User);
    }
}
exports.UserService = UserService;
