import { Routes } from '@angular/router';
import {CreateBookComponent} from './components/pages/create-book/create-book.component';
import {BookComponent} from './components/pages/book/book.component';
import {BooksListComponent} from './components/pages/books-list/books-list.component';
import {ShelvesComponent} from './components/pages/shelves/shelves.component';
import {ShelveComponent} from './components/pages/shelve/shelve.component';
import {authGuard} from './components/auth/auth.guard';
import {EditBookComponent} from './components/pages/edit-book/edit-book.component';

// when entering edit check if user is one who created book

export const routes: Routes = [
    {
      path: 'books',
      component: BooksListComponent
    },
    {
      path: 'books/add',
      component: CreateBookComponent,
      canActivate: [authGuard]
    },
    {
      path: 'books/:id',
      component: BookComponent
    },
    {
      path: 'books/:id/edit',
      component: EditBookComponent,
      canActivate: [authGuard]
    },
    {
      path: 'shelves',
      component: ShelvesComponent,
      canActivate: [authGuard]
    }
];
