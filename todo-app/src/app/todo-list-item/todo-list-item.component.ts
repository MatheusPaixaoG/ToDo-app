import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent implements OnInit {

  // Marking todos with @Input() decorator allows us to inject the todos from the parent component.
  @Input()
  todo: Todo = new Todo({ id: 1, title: 'Read article', complete: false });

  // These are just 2 output events
  @Output()
  remove: EventEmitter<Todo> = new EventEmitter();

  @Output()
  toggleComplete: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  // We emit events from the TodoListItemComponent when a user clicks a link to complete or remove a todo,
  // making our TodoListItemComponent a dumb component.

  toggleTodoComplete(todo: Todo) {
    this.toggleComplete.emit(todo);
  }

  removeTodo(todo: Todo) {
    this.remove.emit(todo);
  }

  ngOnInit(): void {
  }

}
