import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // TODO Global api path

  apiPath: string = "http://localhost:8080/api/auth/login";

  jwtToken: string = '';


  constructor(private http: HttpClient) { }

  login(email: string, password: string){
    return this.http.post(this.apiPath, {
      email: email,
      password: password
    }).pipe(
      tap(res => {
        console.log(res);
    }));
  }

  register(name: string, email: string, password: string){
    return this.http.post("http://localhost:8080/api/auth/register", {
      name: name,
      email: email,
      password: password
    }).pipe(
      tap(res => {
        console.log(res);
    }));
  }
}
