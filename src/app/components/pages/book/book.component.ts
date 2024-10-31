import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CardModule} from 'primeng/card';
import {BookService} from '../../../services/book.service';
import {Book} from '../../../models/book';
import {UserService} from '../../../services/user.service';
import {ToolbarModule} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {CommentsComponent} from '../comments/comments.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CardModule,
    ToolbarModule,
    Button,
    InputTextModule,
    OverlayPanelModule,
    CommentsComponent
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit{
  book = signal<Book | null>(null);

  isLoggedIn = signal<boolean>(false);

  constructor(protected route: ActivatedRoute, private bookService: BookService, private userService: UserService) {
    const id = route.snapshot.paramMap.get('id')
    console.log(route.snapshot.paramMap.get('id'));
    this.bookService.getBook(id!).subscribe(book => {
      this.book.set(book);
      console.log(this.book());
    });
  }

  ngOnInit() {
    this.userService.loggedIn$.subscribe(loggedIn =>
      this.isLoggedIn.set(loggedIn)
    );
  }

  addBookToShelf(){

  }

}
