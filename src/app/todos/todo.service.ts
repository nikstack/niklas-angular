import { Injectable } from '@angular/core';
import { of } from "rxjs";
import { Todo } from "./model/Todo";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  private _todos: Todo[] = [];

  get todos(): Todo[] {
    const matchesFilter = (todo: Todo) => {
      if (this.filter.title && todo.title !== this.filter.title) {
        return false;
      }
      return !(this.filter.completed && todo.completed !== this.filter.completed);

    }

    return this._todos.filter(todo => matchesFilter(todo))
  }

  private _filter: Filter = {};

  get filter(): Filter {
    return this._filter;
  }

  set filter(value: Filter) {
    this._filter = value;
  }

  getAll(callback: (todos: Todo[]) => void) {
    this.httpClient.get<Todo[]>(environment.baseUrl)
      .subscribe(todos => {
        this._todos = todos;
        callback(todos)
      })
    /*of<Todo[]>(
      [
        {
          id: '' + Math.random(),
          title: "Title 1 Title 1 Title 1 Title 1 Title 1 Title 1 Title 1 Title 1 Title 1 Title 1 Title 1 Title 1 Title 1 Title 1 Title 1 ",
          description: "Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 ",
          completed: false
        },
        {
          id: '' + Math.random(),
          title: "Title 1",
          description: "Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 ",
          completed: false
        },
        {
          id: '' + Math.random(),
          title: "Title 1",
          description: "Description 1",
          completed: false
        },
        {
          id: '' + Math.random(),
          title: "Title 1",
          description: "",
          completed: false
        },
        /!*
              {
                title: "Title 1",
                description: "Description 1",
                completed: false
              },
              {
                title: "Title 1",
                description: "Description 1",
                completed: false
              },
              {
                title: "Title 1",
                description: "Description 1",
                completed: false
              },
              {
                title: "Title 1",
                description: "Description 1",
                completed: false
              },
              {
                title: "Title 1",
                description: "Description 1",
                completed: false
              },
              {
                title: "Title 1",
                description: "Description 1",
                completed: false
              },
              {
                title: "Title 1",
                description: "Description 1",
                completed: false
              },
              {
                title: "Title 1",
                description: "Description 1",
                completed: false
              },
              {
                title: "Title 1",
                description: "Description 1",
                completed: false
              },
              {
                title: "Title 1",
                description: "Description 1",
                completed: false
              },
              {
                title: "Title 1",
                description: "Description 1",
                completed: false
              },
              {
                title: "Title 1",
                description: "Description 1",
                completed: false
              },
              {
                title: "Title 2",
                description: "Description 2",
                completed: true
              }*!/
      ]
    ).subscribe(todos => {
      this._todos = todos;
    })*/
  }


  save(todo: Todo, callback: (todos: Todo[]) => void) {
    if (todo.title === '' && todo.description === '') {
      return;
    }
    if (todo.id) {
      this.update(todo, callback);
    } else {
      this.add(todo, callback);
    }
  }

  deleteTodo(todoId: string) {
    this._todos = this.todos.filter(todo => todo.id !== todoId);
    this.httpClient.delete(environment.baseUrl + `/${todoId}`).subscribe();
  }

  private add(todo: Todo, callback: (todos: Todo[]) => void) {
    this.httpClient.post<Todo>(environment.baseUrl, todo)
      .subscribe(todo => {
        this._todos.push(todo);
        callback(this.todos);
      })
  }

  private update(todo: Todo, callback: (todos: Todo[]) => void) {
    this.httpClient.put<Todo>(environment.baseUrl, todo)
      .subscribe(todo => {
        const index = this._todos.findIndex(t => t.id === todo.id)
        this._todos[index] = todo;
        callback(this.todos);
      })
  }
}

interface Filter {
  title?: string;
  completed?: boolean;
}
