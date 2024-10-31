import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ButtonDirective} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {BookService} from '../../../services/book.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    ButtonDirective,
    InputTextModule,
    CardModule,
    InputTextareaModule
  ],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.scss'
})
export class CreateBookComponent {
  bookForm: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService, private router: Router) {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      description: [''],
      pages: [0, [Validators.required, Validators.min(1)]],
      releaseYear: [new Date().getFullYear(), [Validators.required, Validators.min(-2100), Validators.max(new Date().getFullYear())]],
      image: ['']
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      console.log(this.bookForm.value);
      this.bookService.createBook(this.bookForm.value).subscribe(book => {
        this.router.navigate(['/books', 1]);
      });
    } else {
      console.log("Form is invalid");
    }
  }
}
