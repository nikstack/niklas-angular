import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoEditComponent} from './todo-edit/todo-edit.component';
import { BrowserModule } from "@angular/platform-browser";
import { TodoPageComponent } from './todo-page/todo-page.component';


@NgModule({
  declarations: [
    TodoListComponent,
    TodoEditComponent,
    TodoPageComponent
  ],
    exports: [
        TodoListComponent,
        TodoEditComponent,
        TodoPageComponent
    ],
  imports: [
    CommonModule
  ]
})
export class TodosModule {
}
