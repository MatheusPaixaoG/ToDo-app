import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../../todos-main/types/todo';

@Component({
  selector: 'app-todo-list-footer',
  templateUrl: './todo-list-footer.component.html',
  styleUrls: ['./todo-list-footer.component.css']
})
export class TodoListFooterComponent implements OnInit {

  @Input()
  todos: Todo[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
