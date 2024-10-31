import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import {UserService} from '../../../services/user.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService){
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  // TODO handle interface change

  onSubmit(){
    this.userService.login(
      this.loginForm.get('email')?.value,
      this.loginForm.get('password')?.value
    ).subscribe(res => {
      console.log(res);
      this.emitVisibilityChange();
    });
  }

  showDialog() {
      this.visible = true;
  }

  emitVisibilityChange(){
    this.visibleChange.emit(false);
    this.visible = false;
  }
}
