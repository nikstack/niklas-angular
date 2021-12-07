import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Todo } from "../model/Todo";

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {

  @Input() todo!: Todo;
  @Output() onSave = new EventEmitter<Todo>();

  @ViewChild('title') titleInput!: ElementRef<HTMLHeadingElement>;
  @ViewChild('description') descriptionInput!: ElementRef<HTMLParagraphElement>;

  constructor() {
  }

  ngOnInit(): void {
  }

  save() {
    const title = this.titleInput.nativeElement.innerText;
    const description = this.descriptionInput.nativeElement.innerText ?? '';

    if (!this.todo || !title) {
      return;
    }

    this.onSave.emit({
      id: this.todo.id,
      title: title,
      description: description,
      completed: this.todo.completed
    });
  }
}
