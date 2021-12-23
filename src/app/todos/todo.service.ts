import { Injectable } from '@angular/core';
import { Todo } from "./model/Todo";
import { TodoApiService } from "./todo-api.service";
import { BehaviorSubject } from "rxjs";
import State from "../State";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoState = new State<Todo[]>([]);
  private todos: Todo[] = [];

  constructor(
    private readonly todoProvider: TodoApiService
  ) {
    /*setInterval(() => {
      this.todos = [...this.todos, {
        id: '' + Math.random(),
        title: 'Titel',
        description: 'Description',
        completed: Math.random() > 0.5
      }];
      this.todoBs.next(this.todos);
    }, 1000)*/
  }

  private _todoBs = new BehaviorSubject<Todo[]>(this.todos);

  get todoBs() {
    return this._todoBs;
  }

  private _filterUncompleted = false;

  get filterUncompleted() {
    return this._filterUncompleted;
  }

  filter(uncompleted: boolean) {
    this._filterUncompleted = uncompleted;
    this.todoBs.next(this.getFilteredTodos());
  }

  getAll() {
    this.todoProvider.getAll()
      .subscribe(todos => {
        this.todos = todos;
        this.todoBs.next(this.getFilteredTodos());
      })
  }

  save(saveTodo: Todo) {
    if (saveTodo.title === '' && saveTodo.description === '') {
      return;
    }
    if (saveTodo.id) {
      this.todoProvider.update(saveTodo)
        .subscribe(updatedTodo => {
          this.todos = this.todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
          this.todoBs.next(this.getFilteredTodos());
        });
    } else {
      this.todoProvider.add(saveTodo)
        .subscribe(addedTodo => {
          this.todos = [...this.todos, addedTodo];
          this.todoBs.next(this.getFilteredTodos());
        });
    }
  }

  delete(deleteTodoId: string) {
    this.todoProvider.delete(deleteTodoId).subscribe(
      () => {
        this.todos = this.todos.filter(todo => todo.id !== deleteTodoId);
        this.todoBs.next(this.getFilteredTodos());
      }
    );
  }

  updateCompleted(todo: Todo, completed: boolean) {
    this.save({ ...todo, completed })
  }

  private getFilteredTodos() {
    return !this.filterUncompleted ? this.todos : this.todos.filter(todo => !todo.completed);
  }
}
