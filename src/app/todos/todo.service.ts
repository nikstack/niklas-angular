import { Injectable } from '@angular/core';
import { of } from "rxjs";
import { Todo } from "./model/Todo";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { TodoApiService } from "./todo-api.service";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(
    private readonly todoProvider: TodoApiService
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
    this.todoProvider.getAll()
      .subscribe(todos => {
        this._todos = todos;
        callback(todos)
      })
  }

  save(todo: Todo, callback: (todos: Todo[]) => void) {
    if (todo.title === '' && todo.description === '') {
      return;
    }
    if (todo.id) {
      this.todoProvider.update(todo)
        .subscribe(todo => {
          const index = this._todos.findIndex(t => t.id === todo.id)
          this._todos[index] = todo;
          callback(this.todos);
        });
    } else {
      this.todoProvider.add(todo)
        .subscribe(todo => {
          this._todos.push(todo);
          callback(this.todos);
        });
    }
  }

  delete(todoId: string) {
    this._todos = this.todos.filter(todo => todo.id !== todoId);
    this.todoProvider.delete(todoId).subscribe();
  }
}

interface Filter {
  title?: string;
  completed?: boolean;
}
