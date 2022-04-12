import { resolve } from "path";
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
    let arrayWithNoBlank = this.todos.get(userId).filter((todo) => todo.title != '');
    this.todos.set(userId, arrayWithNoBlank);
    var start = Date.now(),
      now = start;
    while (now - start < 100) {
      now = Date.now();
    }
    return this.todos.get(userId);
  }

  createUserTodosList(userId: number) {
    this.todos.set(userId, []);
  }

  createTodos(userId: number, title: string, complete: boolean) {
    let todoId = this.todos.get(userId).length ? this.todos.get(userId)[this.todos.get(userId).length - 1].id + 1 : 1;
    let todo = new Todo({
      "title": title,
      "complete": complete,
      "id": todoId
    });
    this.todos.get(userId).push(todo);
    return todo;
  }

  deleteTodoById(todoId: number, userId: number, todoTitle: string) {
    let todoIdx = this.todos.get(userId).findIndex(t => t.id == todoId && t.title == todoTitle);
    let deletedTodo = this.todos.get(userId).splice(todoIdx, 1);
    return deletedTodo;
  }

  updateTodoById(todoId: number, userId: number, todoTitle: string, todoComplete: boolean) {
    let todoIdx = this.todos.get(userId).findIndex(t => t.id == todoId && t.title == todoTitle);
    this.todos.get(userId)[todoIdx] = new Todo({ todoId, todoTitle, todoComplete });
    let updatedTodo = this.todos.get(userId).splice(todoIdx, 1);
    return updatedTodo;
  }
}