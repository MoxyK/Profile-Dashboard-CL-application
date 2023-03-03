// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        if (!name) {
        throw new Error("You are missing: Name.");
        }
        if (!id) {
          throw new Error("You are missing: ID.");
        }
        if (!email) {
          throw new Error("You are missing: Email.");
        }
        this.name = name;
        this.id = id;
        this.email = email;

}

getName() {
    
}

};