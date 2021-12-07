import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import { Todo } from "../model/Todo";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() todos: Todo[] = [];
  @Output() onSelect = new EventEmitter<Todo>();
  @Output() onDelete = new EventEmitter<string>();
  @ViewChildren('wheel') wheels!: QueryList<ElementRef<HTMLDivElement>>
  private dragStartIndex = 0
  private wheelTimeout: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.wheels) {
      this.setupWheels();
    }
  }

  ngAfterViewInit(): void {
    this.setupWheels();
    this.wheels.changes.subscribe(() => {
      this.setupWheels();
    })
  }

  ngOnInit(): void {
  }

  onListItemClicked(todo: Todo) {
    this.onSelect.emit(todo);
  }

  /*dragStart() {
    // console.log('Event: ', 'dragstart');
    this.dragStartIndex = +this.closest('li').getAttribute('data-index');
  }

  dragEnter() {
    // console.log('Event: ', 'dragenter');
    this.classList.add('over');
  }

  dragLeave() {
    // console.log('Event: ', 'dragleave');
    this.classList.remove('over');
  }

  dragOver(e: DragEvent) {
    // console.log('Event: ', 'dragover');
    e.preventDefault();
  }

  dragDrop() {
    // console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
  }

   swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
  }*/
  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
  }

  deleteTodo(event: MouseEvent, todoId: string) {
    const delay = this.performDeleteAnimation(event);
    setTimeout(() => {
      this.onDelete.emit(todoId);
    }, delay);
  }

  private performDeleteAnimation(event: MouseEvent) {
    const div = event.target as HTMLDivElement;

    div.style.minWidth = div.offsetWidth + 'px';
    div.parentElement!.style.overflow = 'hidden';
    setTimeout(() => {
      div.style.minWidth = '100%';
    }, 10);

    setTimeout(() => {
      div.parentElement!.style.maxHeight = '0';
    }, 150);
    return 400;
  }

  private setupWheels() {
    this.wheels.forEach(wheel => {
      wheel.nativeElement.scrollBy(1000000, 0)
      const scroll = wheel.nativeElement.scrollLeft;
      wheel.nativeElement.onscroll = () => {
        if (wheel.nativeElement.scrollLeft <= 0) {
          wheel.nativeElement.scrollLeft = 0;
        } else if (wheel.nativeElement.scrollLeft >= scroll) {
          wheel.nativeElement.scrollLeft = scroll;
        }

        clearTimeout(this.wheelTimeout);

        this.wheelTimeout = setTimeout(() => {
          if (wheel.nativeElement.scrollLeft <= 0) {
            clearTimeout(this.wheelTimeout)
            return;
          }

          const wheelBack = setInterval(() => {
            wheel.nativeElement.scrollBy(2, 0);
            if (wheel.nativeElement.scrollLeft >= scroll) {
              clearInterval(wheelBack);
            }
          }, 1);
        }, 100);
      }
    })
  }
}
