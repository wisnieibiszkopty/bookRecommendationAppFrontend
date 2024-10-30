import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        Button,
        DialogModule,
        InputTextModule,
        PaginatorModule,
        ReactiveFormsModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService){
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }

  onSubmit(){
    this.userService.register(
      this.registerForm.get('name')?.value,
      this.registerForm.get('email')?.value,
      this.registerForm.get('password')?.value
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
  }
}
