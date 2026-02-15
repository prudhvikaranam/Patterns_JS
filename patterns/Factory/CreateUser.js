import { SuperUser, User } from "../Prototype/User.js";

export class CreateUser {
    static create (name,email,role = 'general'){
        if(role === 'super'){
            return new SuperUser(name,email,role)
        }else if(role === 'general'){
            return new User(name,email,role)
        }else{
            return new User(name,email,role)
        }
    }
}