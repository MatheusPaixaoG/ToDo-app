import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoDataService } from '../todo-data.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  newTodo: Todo = new Todo();
  todos: Todo[] = [];

  constructor(private todoDataService: TodoDataService) {
  }

  // No longer needed, now handled by TodoListHeaderComponent
  // addTodo(): void {
  //   this.todoDataService.addTodo(this.newTodo);
  //   this.newTodo = new Todo();
  // }

  public ngOnInit() {
    this.todoDataService.getAllTodos().subscribe(
      (todos) => {
        this.todos = todos;
      }
    );
  }

  // New method to handle event emitted by TodoListHeaderComponent
  onAddTodo(todo: Todo) {
    this.todoDataService.addTodo(todo).subscribe(
      (newTodo) => {
        this.todos = this.todos.concat(newTodo);
      }
    );
  }

  // rename from toggleTodoComplete
  onToggleTodoComplete(todo: Todo): void {
    this.todoDataService.toggleTodoComplete(todo).subscribe(
      (updatedTodo) => {
        todo = updatedTodo;
      }
    );
  }

  // rename from removeTodo
  onRemoveTodo(todo: Todo): void {
    this.todoDataService.deleteTodoById(todo.id).subscribe(
      (_) => {
        this.todos = this.todos.filter((t) => t.id !== todo.id);
      }
    );
    this.todoDataService.deleteTodoById(todo.id);
  }

}
