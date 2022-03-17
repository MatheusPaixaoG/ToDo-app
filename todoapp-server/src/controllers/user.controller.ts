export class UserController {
  users: any[];

  constructor() {
    this.users = [];
  }

  createUser(firstName: string, lastName: string, username: string, password: string) {
    if (this.users.find(x => x.username === username)) {
      return 0;
    }
    let id = this.users.length ? this.users.length + 1 : 1;
    const newUser = {
      "id": id,
      "firstName": firstName,
      "lastName": lastName,
      "username": username,
      "password": password
    };
    this.users.push(newUser);
    return this.users;
  }
}