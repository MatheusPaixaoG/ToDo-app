import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Todo } from './todo';
import { map, Observable, catchError, throwError, last } from 'rxjs';
import { SessionService } from './session.service';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private session: SessionService) { }

  public signIn(username: string, password: string) {
    return this.http
      .post(API_URL + '/sign-in', {
        username,
        password
      }).pipe(catchError(this.handleError));
  }

  public register(firstName: string, lastName: string, username: string, password: string) {
    return this.http.post(API_URL + '/register', {
      firstName,
      lastName,
      username,
      password
    }).pipe(catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return throwError(() => error);
  }



  // API: GET /todos
  public getAllTodos(): Observable<Todo[]> {
    const options = this.getRequestOptions();
    return this.http.get(API_URL + '/todos', options).pipe(map(response => {
      const todos = <any[]>response;
      return todos.map((todo) => new Todo(todo));
    })).pipe(catchError(this.handleError));
    // will use this.http.get()
  }

  // API: POST /todos
  public createTodo(todo: Todo): Observable<Todo> {
    const options = this.getRequestOptions();
    return this.http.post(API_URL + '/todos', todo, options).pipe(map(response => {
      return new Todo(response);
    })).pipe(catchError(this.handleError));
    // will use this.http.post()
  }

  // API: GET /todos/:id
  public getTodoById(todoId: number): Observable<Todo> {
    const options = this.getRequestOptions();
    return this.http.get(API_URL + '/todos/' + todoId, options).pipe(map(response => {
      return new Todo(response);
    })).pipe(catchError(this.handleError));
    // will use this.http.get()
  }

  // API: PUT /todos/:id
  public updateTodo(todo: Todo): Observable<Todo> {
    const options = this.getRequestOptions();
    return this.http.put(API_URL + '/todos/' + todo.id, todo, options).pipe(map(response => {
      return new Todo(response);
    })).pipe(catchError(this.handleError));
    // will use this.http.put()
  }

  // DELETE /todos/:id
  public deleteTodoById(todoId: number): Observable<null> {
    const options = this.getRequestOptions();
    return this.http.delete(API_URL + '/todos/' + todoId, options).pipe(map(response => null))
      .pipe(catchError(this.handleError));
    // will use this.http.delete()
  }

  private getRequestOptions() {
    const headers = {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + this.session.accessToken)
    }
    return headers;
  }
}
