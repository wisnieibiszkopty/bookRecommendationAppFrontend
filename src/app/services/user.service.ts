import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiPath: string = "localhost:8080/api/users/login";

  jwtToken: string = '';


  constructor(private http: HttpClient) { }

  login(email: string, password: string){
    this.http.post(this.apiPath, {
      email: email,
      password: password
    }).subscribe(res => {
      console.log(res);
    });
  }
}
