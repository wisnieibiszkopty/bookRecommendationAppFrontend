import {Component, Input} from '@angular/core';
import {Book} from '../../../models/book';
import {BookListItemComponent} from '../book-list-item/book-list-item.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-books-container',
  standalone: true,
  imports: [
    BookListItemComponent,
    RouterLink
  ],
  templateUrl: './books-container.component.html',
  styleUrl: './books-container.component.scss'
})
export class BooksContainerComponent {
  @Input() books: Book[] = [];
}
