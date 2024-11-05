import {Component, EventEmitter, Input, Output, signal, ViewChild} from '@angular/core';
import {Comment} from '../../../models/comment';
import {CardModule} from 'primeng/card';
import {TagModule} from 'primeng/tag';
import {UserService} from '../../../services/user.service';
import {FormsModule} from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {Button} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {ConfirmPopup, ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService, MessageService} from 'primeng/api';

export interface EditedComment {
  id: number;
  content: string;
}

@Component({
  selector: 'app-comment-item',
  standalone: true,
  imports: [
    CardModule,
    TagModule,
    FormsModule,
    InputTextareaModule,
    Button,
    ToastModule,
    ConfirmPopupModule
  ],
  templateUrl: './comment-item.component.html',
  styleUrl: './comment-item.component.scss'
})
export class CommentItemComponent {
  @Input() comment: Comment | null = null;
  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<EditedComment>();

  editing = signal<boolean>(false);
  editedComment = signal<string>('');

  loggedIn = signal<boolean>(false);

  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  constructor(protected userService: UserService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
    console.log(this.comment);

    this.userService.loggedIn$.subscribe(loggedIn => {
      this.loggedIn.set(loggedIn);
    });
  }

  editComment(){
    this.edit.emit({
      id: this.comment?.id!,
      content: this.editedComment()
    });
  }

  showEditForm(){
    this.editedComment.set(this.comment?.content!);
    this.editing.set(true);
  }

  acceptDeleting(){
    this.confirmPopup.accept();
  }

  rejectDeleting(){
    this.confirmPopup.reject();
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this comment?',
      accept: () => {
        this.deleteComment();
        this.messageService.add({ severity: 'info', summary: 'Deleted', detail: 'Comment deleted', life: 3000 });
      },
      reject: () => {}
    });
  }

  deleteComment(){
    this.delete.emit();
  }

  formatDate(dateString: string){
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${hours}:${minutes} ${day}-${month}-${year}`;
  }
}
