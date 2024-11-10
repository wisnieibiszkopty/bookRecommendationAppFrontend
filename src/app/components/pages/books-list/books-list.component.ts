import {Component, OnInit, signal} from '@angular/core';
import {BookService} from '../../../services/book.service';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {Book} from '../../../models/book';
import {DataViewModule} from 'primeng/dataview';
import {TagModule} from 'primeng/tag';
import {NgClass} from '@angular/common';
import {CardModule} from 'primeng/card';
import {PaginatorModule} from 'primeng/paginator';
import {BookItemComponent} from '../../comments/book-item/book-item.component';
import {BookListItemComponent} from '../../comments/book-list-item/book-list-item.component';
import {BooksContainerComponent} from '../../comments/books-container/books-container.component';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    DataViewModule,
    TagModule,
    NgClass,
    CardModule,
    PaginatorModule,
    BookItemComponent,
    BookListItemComponent,
    BooksContainerComponent,
  ],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss'
})
export class BooksListComponent implements OnInit{
  books = signal<Book[]>([]);

  totalRecords = 0;
  currentPage = 1;

  constructor(private bookService: BookService, protected userService: UserService) {
  }

  ngOnInit() {
    console.log("init");
    this.loadBooks(this.currentPage);
  }

  private loadBooks(page: number){
    this.bookService.getBooks(page - 1).subscribe(booksPagination => {
      console.log(booksPagination);
      this.books.set(booksPagination.books);
      this.totalRecords = booksPagination.totalElements;
    })
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.loadBooks(this.currentPage);
  }

}
