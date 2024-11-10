import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Book} from '../models/book';
import {environment} from '../../environment';
import {map, Observable, tap} from 'rxjs';

export interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

export interface BookPagination {
  books: Book[],
  pageEvent: PageEvent,
  totalElements: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly pageSize = 6;

  constructor(private http: HttpClient) { }

  getBook(id: string | number): Observable<Book>{
    return this.http.get<Book>(environment.api + 'books/' + id);
  }

  getBooks(page: number): Observable<BookPagination>{
    return this.http.get(environment.api + 'books', {
      params: new HttpParams()
        .set('page', page)
        .set('size', this.pageSize)
    }).pipe(
      map((res: any) => {
        console.log(res);
          const pageEvent: PageEvent = {
            first: 0,
            rows: 6,
            page: res.pageable.pageNumber,
            pageCount: res.totalPages
          };

          const bookPagination: BookPagination = {
            books: res.content,
            pageEvent: pageEvent,
            totalElements: res.totalElements
          };

          return bookPagination;
        })
    );
  }

  createBook(book: Book):Observable<any>{
    return this.http.post(environment.api + 'books', book);
  }

  editBook(book: Book): Observable<Book>{
    return this.http.put<Book>(environment.api + 'books/' + book.id, book);
  }

  deleteBook(id: string | number){
    return this.http.delete(environment.api + "books/" + id);
  }

}
