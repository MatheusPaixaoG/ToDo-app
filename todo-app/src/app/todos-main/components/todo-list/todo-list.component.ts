import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  // Marking todos with @Input() decorator allows us to inject the todos from the parent component.
  @Input()
  todos: Todo[] = [];

  // These are just 2 output events
  @Output()
  remove: EventEmitter<Todo> = new EventEmitter();

  @Output()
  toggleComplete: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  onToggleTodoComplete(todo: Todo) {
    this.toggleComplete.emit(todo);
  }

  onRemoveTodo(todo: Todo) {
    this.remove.emit(todo);
  }

  ngOnInit(): void {
  }

}
