import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from '../models/book';
import {environment} from '../../environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBook(id: string | number): Observable<Book>{
    return this.http.get<Book>(environment.api + 'books/' + id);
  }

  // TODO pagination
  getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(environment.api + 'books');
  }

  createBook(book: Book):Observable<any>{
    return this.http.post(environment.api + 'books', book);
  }

  editBook(book: Book): Observable<Book>{
    return this.http.put<Book>(environment.api + 'books', book);
  }

  deleteBook(id: string | number){
    return this.http.delete(environment.api + "books/" + id);
  }

}
