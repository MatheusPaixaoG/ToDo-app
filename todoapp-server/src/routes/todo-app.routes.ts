import { Router } from "express";
import { TodosController } from "../controllers/todos.controller";
import { UserController } from "../controllers/user.controller";

const todoRouter = Router();
const userController = new UserController;
const todosController = new TodosController;
let users = [];

// Handle register requests
todoRouter.route('/register')
  .post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const password = req.body.password;
    const newUser = userController.createUser(firstName, lastName, username, password);
    if (!newUser) {
      return res.status(422).json('Username "' + username + '" is already taken');
    }
    return res.json(newUser);
  })

todoRouter.route('/sign-in')
  .post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const signInUser = userController.signIn(username, password);
    if (!signInUser) {
      return res.status(422).json('Invalid username and password');
    }
    return res.json(signInUser);
  })

todoRouter.route('/todos/:userId')
  .get((req, res) => {
    let id: number = parseInt(req.params.userId);
    const userTodos = todosController.getTodos(id);
    return res.json(userTodos);
  })
  .post((req, res) => {
    let id: number = parseInt(req.params.userId);
    const todoTitle = req.body.todoTitle;
    const todoComplete = req.body.todoComplete;
    const newTodo = todosController.createTodos(id, todoTitle, todoComplete);
    return res.json(newTodo);
  })
  .put((req, res) => {
    let userId: number = parseInt(req.params.userId);
    const todoId = req.body.id;
    const todoTitle = req.body.todoTitle;
    const todoComplete = req.body.todoComplete;
    const updatedTodo = todosController.updateTodoById(todoId, userId, todoTitle, todoComplete);
    console.log(updatedTodo);
    return res.json(updatedTodo);
  })

todoRouter.route('/todos/:userId/:todoId/:todoTitle')
  .delete((req, res) => {
    let userId: number = parseInt(req.params.userId);
    let todoId: number = parseInt(req.params.todoId);
    let todoTitle: string = req.params.todoTitle;
    const deletedTodo = todosController.deleteTodoById(todoId, userId, todoTitle);
    console.log(deletedTodo);
    return res.json(deletedTodo);
  })
export default todoRouter;