import {Component, OnInit, signal} from '@angular/core';
import {BookService} from '../../../services/book.service';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {Book} from '../../../models/book';
import {DataViewModule} from 'primeng/dataview';
import {TagModule} from 'primeng/tag';
import {NgClass} from '@angular/common';
import {CardModule} from 'primeng/card';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    DataViewModule,
    TagModule,
    NgClass,
    CardModule
  ],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss'
})
export class BooksListComponent implements OnInit{
  layout: 'list' | 'grid' = 'list';

  books = signal<Book[]>([]);

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.bookService.getBooks().subscribe(books => {
      console.log(books);
      this.books.set(books);
    })
  }

}
