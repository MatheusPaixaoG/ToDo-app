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

  deleteTodoById(todoId: number, userId: number, todoTitle: string) {
    let todoIdx = this.todos.get(userId).findIndex(t => t.id == todoId && t.title == todoTitle);
    let deletedTodo = this.todos.get(userId).splice(todoIdx, 1);
    return deletedTodo;
  }
}