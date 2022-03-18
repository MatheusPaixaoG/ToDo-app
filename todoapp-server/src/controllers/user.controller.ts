export class UserController {
  users: any[];
  // Sample JWT token for demo purposes
  jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2l0ZVBvaW50IFJ' +
    'lYWRlciJ9.sS4aPcmnYfm3PQlTtH14az9CGjWkjnsDyG_1ats4yYg';

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

  signIn(username: string, password: string) {
    if (this.users.find(x => x.username === username && x.password === password)) {
      const resp = {
        name: 'SitePoint Reader',
        token: this.jwtToken
      };
      return resp;
    }
    return 0;
  }
}