import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {Comment} from '../../../models/comment';
import {CardModule} from 'primeng/card';
import {TagModule} from 'primeng/tag';
import {UserService} from '../../../services/user.service';
import {FormsModule} from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {Button} from 'primeng/button';

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
    Button
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


  constructor(protected userService: UserService) {
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

  deleteComment(){
    this.delete.emit();
  }
}
