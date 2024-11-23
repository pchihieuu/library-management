import { User } from "../models/user.entity";
import { UserService } from "../services/user.service";
import { GenericController } from "./generic.controller";


export class UserController extends GenericController<User> {
    constructor() {
        super(new UserService());
    }
}