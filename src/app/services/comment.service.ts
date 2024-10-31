import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment';
import {Observable} from 'rxjs';
import {Comment} from '../models/comment';
import {EditedComment} from '../components/comments/comment-item/comment-item.component';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComments(bookId: string | number): Observable<Comment[]>{
    return this.http.get<Comment[]>(environment.api + 'books/' + bookId + '/comments');
  }

  addComment(bookId: string | number, content: string): Observable<Comment>{
    return this.http.post<Comment>(environment.api + 'books/' + bookId + '/comments',{comment: content});
  }

  editComment(comment: EditedComment, bookId: number | string): Observable<Comment>{
    return this.http.put<Comment>(environment.api + 'books/' + bookId + "/comments/" + comment.id, {comment: comment.content});
  }

  deleteComment(bookId: number | string, commentId: number | string){
    return this.http.delete(environment.api + "books/" + bookId + "/comments/" + commentId);
  }
}
