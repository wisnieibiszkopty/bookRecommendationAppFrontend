import {Component, Input} from '@angular/core';
import {Book} from '../../../models/book';

@Component({
  selector: 'app-book-list-item',
  standalone: true,
  imports: [],
  templateUrl: './book-list-item.component.html',
  styleUrl: './book-list-item.component.scss'
})
export class BookListItemComponent {
  @Input() book: Book | null = null;
}
