import { Component, OnInit } from '@angular/core';
import { Todo } from "../model/Todo";
import { BehaviorSubject, Observable } from "rxjs";
import { TodoService } from "../todo.service";

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {

  selectedTodo?: Todo = undefined;
  todoBs = new BehaviorSubject<Todo[]>([]);

  constructor(
    public readonly todoService: TodoService
  ) {
  }



  get isBottomDialogShown(): boolean {
    return this.selectedTodo !== undefined;
  }

  ngOnInit(): void {
    this.todoService.getAll();
    this.todoBs = this.todoService.todoBs;
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
    this.todoService.save(todo);
    this.hideBottomDialog();
  }

  deleteTodo(todoId: string) {
    this.todoService.delete(todoId);
  }

  toggleFilterUncompleted() {
    this.todoService.filter(!this.todoService.filterUncompleted);
  }
}
