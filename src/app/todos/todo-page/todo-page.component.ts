import { Component, OnInit } from '@angular/core';
import { Todo } from "../model/Todo";
import { Observable } from "rxjs";
import { TodoService } from "../todo.service";

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {

  todos: Todo[] = [];
  todo = new Observable<Todo>();
  selectedTodo?: Todo = undefined;

  constructor(
    public readonly todoService: TodoService
  ) {
  }


  get isBottomDialogShown(): boolean {
    return this.selectedTodo !== undefined;
  }

  ngOnInit(): void {
    this.todoService.getAll(todos => this.todos = todos);
  }

  hideBottomDialog() {
    this.selectedTodo = undefined;
  }

  showBottomDialog(todo?: Todo) {
    if (!todo) {
      todo = {
        title: 'Neues Todo',
        description: '',
        completed: false
      }
    }
    this.selectedTodo = todo;
  }

  save(todo: Todo) {
    this.todoService.save(todo, todos => this.todos = todos);
    this.hideBottomDialog();
  }

  deleteTodo(todoId: string) {
    this.todoService.delete(todoId);
    this.todos = this.todoService.todos;
  }
}
