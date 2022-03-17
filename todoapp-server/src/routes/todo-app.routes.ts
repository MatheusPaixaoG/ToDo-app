import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const todoRouter = Router();
const userController = new UserController;
let users = [];

// Handle register requests
todoRouter.route('/register').post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const password = req.body.password;
  const newUser = userController.createUser(firstName, lastName, username, password);
  if (!newUser) {
    return res.status(422).json('Username "' + username + '" is already taken');
  }
  return res.json({ newUser });
})
export default todoRouter;