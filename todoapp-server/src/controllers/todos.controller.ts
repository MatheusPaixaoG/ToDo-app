import { Todo } from "../models/todo";

export class TodosController {
  todos: Map<number, Todo[]>;

  constructor() {
    this.todos = new Map();
  }

  getTodos(userId: number) {
    if (!this.todos.has(userId)) {
      this.createUserTodosList(userId);
    }
    return this.todos.get(userId);
  }

  createUserTodosList(userId: number) {
    let todo = new Todo({
      "title": "a",
      "complete": false,
      "id": 1
    });
    this.todos.set(userId, []);
    this.todos.get(userId).push(todo);
  }
}