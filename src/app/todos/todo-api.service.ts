import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Todo } from "./model/Todo";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  getAll(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(environment.baseUrl)
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

  add(todo: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>(environment.baseUrl, todo);
  }

  update(todo: Todo): Observable<Todo> {
    return this.httpClient.put<Todo>(environment.baseUrl, todo);
  }

  delete(todoId: string): Observable<void> {
    return this.httpClient.delete<void>(environment.baseUrl + `/${todoId}`);
  }
}
