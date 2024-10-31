import { Routes } from '@angular/router';
import {CreateBookComponent} from './components/pages/create-book/create-book.component';
import {BookComponent} from './components/pages/book/book.component';
import {BooksListComponent} from './components/pages/books-list/books-list.component';
import {ShelvesComponent} from './components/pages/shelves/shelves.component';
import {ShelveComponent} from './components/pages/shelve/shelve.component';

export const routes: Routes = [
    {
        path: 'books', component: BooksListComponent
    },
    {
        path: 'books/add', component: CreateBookComponent
    },
    {
        path: 'books/:id', component: BookComponent
    },
    {
        path: 'shelves', component: ShelvesComponent
    },
    {
      path: 'shelves/:id', component: ShelveComponent
    }
];
