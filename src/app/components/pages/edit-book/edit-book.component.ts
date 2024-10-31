import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {BookService} from '../../../services/book.service';
import {Router} from '@angular/router';
import {Book} from '../../../models/book';

@Component({
  selector: 'app-edit-book',
  standalone: true,
    imports: [
        ButtonDirective,
        FormsModule,
        InputTextModule,
        InputTextareaModule,
        ReactiveFormsModule
    ],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.scss'
})
export class EditBookComponent {
  bookId: number = 0;
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router) {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      description: [''],
      pages: ['', [Validators.required, Validators.min(1)]],
      releaseYear: [new Date().getFullYear(), [Validators.required, Validators.min(-2100), Validators.max(new Date().getFullYear())]],
      image: ['']
    });

    const navigation = this.router.getCurrentNavigation();

    if(navigation?.extras.state){
      const book = navigation.extras.state['book'] as Book;
      this.bookId = book.id!;
      this.bookForm.patchValue({
        name: book.name,
        author: book.author,
        description: book.description,
        pages: book.pages,
        releaseYear: book.releaseYear,
        image: book.image
      });
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      console.log(this.bookForm.value);
      const book: Book = {
        id: this.bookId,
        ...this.bookForm.value
      };

      this.bookService.editBook(book).subscribe(book => {
        this.router.navigate(['/books', book.id]);
      });
    } else {
      console.log("Form is invalid");
    }
  }
}
