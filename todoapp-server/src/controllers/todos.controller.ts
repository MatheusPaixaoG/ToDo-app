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
    this.todos.set(userId, []);
  }

  createTodos(userId: number, title: string, complete: boolean) {
    let todoId = this.todos.get(userId).length ? this.todos.get(userId).length + 1 : 1;
    let todo = new Todo({
      "title": title,
      "complete": complete,
      "id": todoId
    });
    this.todos.get(userId).push(todo);
    return todo;
  }
}