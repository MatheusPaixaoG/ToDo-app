import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../../todo';

@Component({
  selector: 'app-todo-list-header',
  templateUrl: './todo-list-header.component.html',
  styleUrls: ['./todo-list-header.component.css']
})
export class TodoListHeaderComponent implements OnInit {

  newTodo: Todo = new Todo();

  // Every time we call add.emit(value) in TodoListHeaderComponent, the onAddTodo($event) handler 
  // will be called in app.component.html and $event will be equal to value. This decouples our 
  // TodoListHeaderComponent from the TodoDataService and allows the parent component to decide what needs to 
  // happen when a new todo is created. Also, the TodoListHeaderComponent is not aware that the TodoDataService
  // exists, so we won't have to worry about it when communicating with a Rest API

  @Output()
  add: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  addTodo(): void {
    this.add.emit(this.newTodo);
    this.newTodo = new Todo();
  }

  ngOnInit(): void {
  }

}
