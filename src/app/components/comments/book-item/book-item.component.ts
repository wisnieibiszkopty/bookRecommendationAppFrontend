import {Component, Input} from '@angular/core';
import {CardModule} from "primeng/card";
import {PrimeTemplate} from "primeng/api";
import {Book} from '../../../models/book';

@Component({
  selector: 'app-book-item',
  standalone: true,
    imports: [
        CardModule,
        PrimeTemplate
    ],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.scss'
})
export class BookItemComponent {
  @Input() book: Book | null = null;
}
