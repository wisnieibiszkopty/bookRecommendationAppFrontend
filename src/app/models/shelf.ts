import {Book} from './book';

export interface Shelf {
  id: number;
  name: string;
  books: Book[]
}
