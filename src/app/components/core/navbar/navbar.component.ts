import {Component, OnInit, signal} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { LoginComponent } from '../../auth/login/login.component';
import {RegisterComponent} from '../../auth/register/register.component';
import {NgIf} from '@angular/common';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, LoginComponent, RegisterComponent, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  showLogin: boolean = false;
  showRegister: boolean = false;

  username: string = '';
  items: MenuItem[] = [];

  notLoggedInItems: MenuItem[] = [
    { label: "Books", route: 'books' },
    { label: "Login", command: () => this.login() },
    { label: "Register", command: () => this.register() }
  ];

  loggedInItems: MenuItem[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.loggedIn$.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.items = this.notLoggedInItems;
      } else {
        this.username = this.userService.getUser()?.name || 'User';
        this.updateLoggedInItems();
      }
    });
  }

  updateLoggedInItems() {
    this.loggedInItems = [
      { label: "Books", route: 'books' },
      { label: "Shelf", route: 'shelves' },
      { label: `Hello ${this.username}` },
      { label: "Logout", command: () => this.logout() }
    ];
    this.items = this.loggedInItems;
  }

  login(){
    // 🤢🤮
    this.showLogin = false;
    setTimeout(() => this.showLogin = true, 0);
  }

  register(){
    this.showRegister = false;
    setTimeout(() => this.showRegister = true, 0);
  }

  handleLoginVisibility(event: any){
    this.showLogin = false;
  }

  handleRegisterVisibility(event: any){
    this.showRegister = false;
  }

  logout(){
    this.userService.logout();
  }
}
