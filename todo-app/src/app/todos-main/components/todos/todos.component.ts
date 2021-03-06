import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { Todo } from '../../../todos-main/types/todo';
import { TodoDataService } from '../../services/todo-data.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  newTodo: Todo = new Todo();
  todos: Todo[] = [];
  id!: number;

  constructor(private todoDataService: TodoDataService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router) {
  }

  public ngOnInit() {
    this.route.data.pipe(map((data) => data['todos'])).subscribe(
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
    this.todoDataService.deleteTodoById(todo.id, todo.title).subscribe(
      (_) => {
        this.todos = this.todos.filter((t) => t.id !== todo.id);
      }
    );
  }

  doSignOut() {
    this.auth.doSignOut();
    this.router.navigate(['/sign-in']);
  }

}
