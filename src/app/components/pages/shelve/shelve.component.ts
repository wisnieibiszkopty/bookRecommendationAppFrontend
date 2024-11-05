import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Book} from '../../../models/book';
import {CardModule} from 'primeng/card';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {ConfirmPopup, ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-shelve',
  standalone: true,
  imports: [
    CardModule,
    Button,
    RouterLink,
    ConfirmPopupModule
  ],
  templateUrl: './shelve.component.html',
  styleUrl: './shelve.component.scss'
})
export class ShelveComponent {
  @Input() books: Book[] = [];
  @Output() delete = new EventEmitter<number>();

  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  acceptDeleting(){
    this.confirmPopup.accept();
  }

  rejectDeleting(){
    this.confirmPopup.reject();
  }

  confirm(event: Event, bookId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to this book from shelf?',
      accept: () => {
        this.delete.emit(bookId);
        this.messageService.add({ severity: 'info', summary: 'Deleted', detail: 'Book deleted', life: 3000 });
      },
      reject: () => {}
    });
  }
}
