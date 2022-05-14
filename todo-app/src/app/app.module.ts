import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListHeaderComponent } from './todos-main/components/todo-list-header/todo-list-header.component';
import { TodoListComponent } from './todos-main/components/todo-list/todo-list.component';
import { TodoListItemComponent } from './todos-main/components/todo-list-item/todo-list-item.component';
import { TodoListFooterComponent } from './todos-main/components/todo-list-footer/todo-list-footer.component';
import { TodoDataService } from './todos-main/services/todo-data.service';
import { ApiService } from './api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TodosComponent } from './todos-main/components/todos/todos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SessionService } from './session.service';
import { AuthService } from './core/auth/auth.service';
import { SignInComponent } from './home/pages/sign-in/sign-in.component';
import { RegisterComponent } from './home/pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListHeaderComponent,
    TodoListComponent,
    TodoListItemComponent,
    TodoListFooterComponent,
    TodosComponent,
    PageNotFoundComponent,
    SignInComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    TodoDataService,
    ApiService,
    HttpClient,
    SessionService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
