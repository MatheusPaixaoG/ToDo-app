import { Router } from "express";

const todoRouter = Router();
let users = [];

// Handle register requests
todoRouter.route('/register').post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const password = req.body.password;
  if (users.find(x => x.username === username)) {
    res.status(422).send('Username "' + username + '" is already taken');
  }
  let id = users.length ? users.length + 1 : 1;
  const user = {
    "id": id,
    "firstName": firstName,
    "lastName": lastName,
    "username": username,
    "password": password
  };
  users.push(user);
  res.json({
    id,
    users
  })
})
export default todoRouter;