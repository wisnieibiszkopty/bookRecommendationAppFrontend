import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CardModule} from 'primeng/card';
import {BookService} from '../../../services/book.service';
import {Book} from '../../../models/book';
import {UserService} from '../../../services/user.service';
import {ToolbarModule} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {CommentsComponent} from '../../comments/comments/comments.component';
import {BookItemComponent} from '../../comments/book-item/book-item.component';
import {RecommendationsComponent} from '../../comments/recommendations/recommendations.component';
import {ShelfService} from '../../../services/shelve.service';
import {ListboxModule} from 'primeng/listbox';
import {Shelf} from '../../../models/shelf';
import {FormsModule} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmPopup, ConfirmPopupModule} from 'primeng/confirmpopup';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CardModule,
    ToolbarModule,
    Button,
    InputTextModule,
    OverlayPanelModule,
    CommentsComponent,
    BookItemComponent,
    RecommendationsComponent,
    RouterLink,
    ListboxModule,
    FormsModule,
    ConfirmPopupModule
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit{
  book = signal<Book | null>(null);

  isLoggedIn = signal<boolean>(false);

  shelves = signal<Shelf[]>([]);
  selectedShelf = signal<Shelf | null>(null);

  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  constructor(
    protected route: ActivatedRoute,
    private bookService: BookService,
    protected userService: UserService,
    private router: Router,
    private shelfService: ShelfService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
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

  loadShelves(){
    this.shelfService.getShelves(this.userService.getUser()?.id!).subscribe(shelves => {
      console.log(shelves);
      this.shelves.set(shelves);
    });
  }

  addBookToShelf(){
    console.log(this.selectedShelf());
    this.shelfService.addBookToShelf(this.selectedShelf()?.id!, this.book()?.id!).subscribe(
      next => {
        this.messageService.add({severity: 'success', summary: 'Added to shelf', detail: 'Added book to shelf', life: 3000});
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Cannot add to shelf', detail: 'Book is already in this shelf', life: 3000});
      }
    );
  }

  acceptDeleting(){
    this.confirmPopup.accept();
  }

  rejectDeleting(){
    this.confirmPopup.reject();
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this book?',
      accept: () => {
        this.deleteBook();
        this.messageService.add({ severity: 'info', summary: 'Deleted', detail: 'Book deleted', life: 3000 });
      },
      reject: () => {}
    });
  }

  deleteBook(){
    this.bookService.deleteBook(this.book()?.id!).subscribe(_ => {
      this.router.navigate(['/', 'books']);
    });
  }

}
