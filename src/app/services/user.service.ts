import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject, tap} from 'rxjs';
import {environment} from '../../environment';
import {MessageService} from 'primeng/api';

export interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private jwtToken: string = '';
  private userSubject = new BehaviorSubject<User | null>(null);
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  user$ = this.userSubject.asObservable();
  loggedIn$ = this.loggedInSubject.asObservable();

  getUser(): User | null{
    return this.userSubject.getValue();
  }

  getLoggedIn(): boolean{
    return this.loggedInSubject.getValue();
  }

  getToken(): string{
    return this.jwtToken;
  }

  constructor(private http: HttpClient) {
    this.loadTokenFromStorage();
  }

  login(email: string, password: string){
    return this.http.post(environment.api + "auth/login", {
      email: email,
      password: password
    }).pipe(
      tap((res: any) => {
        this.handleToken(res.jwt);
    }));
  }

  register(name: string, email: string, password: string){
    return this.http.post(environment.api + "auth/register", {
      name: name,
      email: email,
      password: password
    }).pipe(
      tap((res: any) => {
        this.handleToken(res.jwt);
    }));
  }

  logout(){
    this.jwtToken = '';
    localStorage.removeItem('jwtToken');
    this.userSubject.next(null);
    this.loggedInSubject.next(false);
  }

  private handleToken(jwt: string){
    this.jwtToken = jwt;
    localStorage.setItem('jwtToken', jwt);
    const payload = this.extractJwt(jwt);
    const user: User = {
      id: payload.id,
      name: payload.name,
      email: payload.sub
    };

    console.log(user);

    this.userSubject.next(user);
    this.loggedInSubject.next(true);
  }

  private extractJwt(jwt: string){
    const tokenArray = jwt.split('.');
    return JSON.parse(atob(tokenArray[1]));
  }

  private loadTokenFromStorage() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.jwtToken = token;
      this.handleToken(token);
    }
  }
}
