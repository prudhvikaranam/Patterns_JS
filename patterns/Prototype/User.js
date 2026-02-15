export class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.role = 'general';
    }
}

export class SuperUser extends User {
    constructor(name, email) {
        super(name, email); // this line refers/calls like User.constructor(name,email) and it will automatically assign this.name and this.email;
        this.role = 'super';
    }
}
