import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';
import { map, Observable, catchError, throwError } from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return throwError(() => error);
  }

  // API: GET /todos
  public getAllTodos(): Observable<Todo[]> {
    return this.http.get(API_URL + '/todos').pipe(map(response => {
      const todos = JSON.parse(JSON.stringify(response));
      return todos.map((todo: Object | undefined) => new Todo(todo));
    })).pipe(catchError(this.handleError));
    // will use this.http.get()
  }

  // API: POST /todos
  public createTodo(todo: Todo) {
    // will use this.http.post()
  }

  // API: GET /todos/:id
  public getTodoById(todoId: number) {
    // will use this.http.get()
  }

  // API: PUT /todos/:id
  public updateTodo(todo: Todo) {
    // will use this.http.put()
  }

  // DELETE /todos/:id
  public deleteTodoById(todoId: number) {
    // will use this.http.delete()
  }
}
