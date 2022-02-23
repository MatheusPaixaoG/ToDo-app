import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiMockService } from './api-mock.service';
import { ApiService } from './api.service';
import { AppComponent } from './app.component';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';

describe('AppComponent', () => {
  let httpTestingController: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        TodoDataService,
        {
          provide: ApiService,
          useClass: ApiMockService
        }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ]
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a newTodo todo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.newTodo instanceof Todo).toBeTruthy;
  })

  // Test moved to todo-list-header.component.spec.ts
  // it('should display "Todos" in h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Todos');
  // })
});
