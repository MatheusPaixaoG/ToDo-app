import { Component } from '@angular/core';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  newTodo: Todo = new Todo();
  todos: Todo[] = [];

  constructor(private todoDataService: TodoDataService) {
  }

  // No longer needed, now handled by TodoListHeaderComponent
  // addTodo(): void {
  //   this.todoDataService.addTodo(this.newTodo);
  //   this.newTodo = new Todo();
  // }

  // New method to handle event emitted by TodoListHeaderComponent
  onAddTodo(todo: Todo) {
    this.todoDataService.addTodo(todo);
  }

  // rename from toggleTodoComplete
  onToggleTodoComplete(todo: Todo): void {
    this.todoDataService.toggleTodoComplete(todo);
  }

  // rename from removeTodo
  onRemoveTodo(todo: Todo): void {
    this.todoDataService.deleteTodoById(todo.id);
  }

  getTodos(): Todo[] {
    return this.todoDataService.getAllTodos();
  }
}
