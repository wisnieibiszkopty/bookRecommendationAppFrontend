import { Component, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { LoginComponent } from '../../auth/login/login.component';
import {RegisterComponent} from '../../auth/register/register.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, LoginComponent, RegisterComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  showLogin = signal<boolean>(false);
  showRegister = signal<boolean>(false);

  items: MenuItem[] = [
      {
        label: "Books",
        route: '/books'
      },
      {
        label: "Shelf",
        route: '/shelves'
      },
      {
        label: "Login",
        command: () => this.login()
      },
      {
        label: "Register",
        command: () => this.register()
      }
  ];

  login(){
    console.log("login");
    this.showLogin.set(true);
  }

  register(){
    console.log("register");
    this.showRegister.set(true);
  }

  handleLoginVisibility(event: any){
    this.showLogin.set(false);
  }

  handleRegisterVisibility(event: any){
    this.showRegister.set(false);
  }
}
