import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../../../models/book';
import {CardModule} from 'primeng/card';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-shelve',
  standalone: true,
  imports: [
    CardModule,
    Button
  ],
  templateUrl: './shelve.component.html',
  styleUrl: './shelve.component.scss'
})
export class ShelveComponent {
  @Input() books: Book[] = [];
  @Output() delete = new EventEmitter<number>();

}
