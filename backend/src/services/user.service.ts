import { User } from "../models/user.entity";
import { GenericService } from "./generic.service";


export class UserService extends GenericService<User> {
    constructor() {
        super(User)
    }
}