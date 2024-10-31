import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment';
import {Observable} from 'rxjs';
import {Shelf} from '../models/shelf';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {

  constructor(private http: HttpClient) { }

  getShelves(userId: string | number): Observable<Shelf[]>{
    console.log(userId);
    return this.http.get<Shelf[]>(environment.api + 'shelves/user/' + userId);
  }

  getShelf(id: string | number): Observable<Shelf>{
    return this.http.get<Shelf>(environment.api + 'shelves/' + id);
  }

  addShelf(name: string): Observable<Shelf>{
    return this.http.post<Shelf>(environment.api + 'shelves', {name: name});
  }

  editShelf(){

  }

  deleteShelf(id: string | number){
    return this.http.delete(environment.api + 'shelves/' + id);
  }
}
