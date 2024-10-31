import {Component, Input, OnInit, signal} from '@angular/core';
import {CommentService} from '../../../services/comment.service';
import {Comment} from '../../../models/comment';
import {FloatLabelModule} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CommentItemComponent} from '../../comments/comment-item/comment-item.component';


@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    FloatLabelModule,
    FormsModule,
    Button,
    InputTextModule,
    CommentItemComponent

  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit{
  @Input() bookId: string = "";
  newComment: string = "";

  comments = signal<Comment[]>([]);

  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
    this.commentService.getComments(this.bookId).subscribe(comments => {
      console.log(comments);
      this.comments.set(comments);
    });
  }

  addComment(){
    this.commentService.addComment(this.bookId, this.newComment).subscribe(comment => {
      this.comments.update(comments => [...comments, comment]);
      this.newComment = "";
    });
  }

}
