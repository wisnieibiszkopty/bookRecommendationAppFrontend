import {Component, Input, OnInit, signal} from '@angular/core';
import {CommentService} from '../../../services/comment.service';
import {Comment} from '../../../models/comment';
import {FloatLabelModule} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CommentItemComponent, EditedComment} from '../../comments/comment-item/comment-item.component';
import {UserService} from '../../../services/user.service';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    FloatLabelModule,
    FormsModule,
    Button,
    InputTextModule,
    CommentItemComponent,
    NgIf
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit{
  @Input() bookId: string = "";
  newComment: string = "";

  comments = signal<Comment[]>([]);

  loggedIn = signal<boolean>(false);

  constructor(private commentService: CommentService, private userService: UserService) {
  }

  ngOnInit() {
    this.commentService.getComments(this.bookId).subscribe(comments => {
      console.log(comments);
      this.comments.set(comments);
    });

    this.userService.loggedIn$.subscribe(loggedIn => {
      this.loggedIn.set(loggedIn);
    });
  }

  addComment(){
    this.commentService.addComment(this.bookId, this.newComment).subscribe(comment => {
      this.comments.update(comments => [...comments, comment]);
      this.newComment = "";
    });
  }

  editComment(comment: EditedComment){
    console.log(comment);
    this.commentService.editComment(comment, this.bookId).subscribe(comment => {
      this.comments.update(comments =>
        comments.map(c => c.id === comment.id ? { ...c, ...comment } : c));
    });
  }

  deleteComment(comment: Comment){
    this.commentService.deleteComment(this.bookId, comment.id).subscribe(_ => {
      this.comments.update(comments => comments.filter(c => c.id !== comment.id));
    });
  }

}
