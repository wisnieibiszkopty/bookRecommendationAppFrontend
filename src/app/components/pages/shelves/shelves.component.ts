import {Component, OnInit, signal} from '@angular/core';
import {Button} from "primeng/button";
import {RouterLink} from '@angular/router';
import {InplaceModule} from 'primeng/inplace';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {ShelfService} from '../../../services/shelve.service';
import {Shelf} from '../../../models/shelf';
import {UserService} from '../../../services/user.service';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {DialogModule} from 'primeng/dialog';
import {ShelveComponent} from '../shelve/shelve.component';

@Component({
  selector: 'app-shelves',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    InplaceModule,
    InputTextModule,
    FormsModule,
    CardModule,
    DividerModule,
    DialogModule,
    ShelveComponent
  ],
  templateUrl: './shelves.component.html',
  styleUrl: './shelves.component.scss'
})
export class ShelvesComponent implements OnInit{
  // for adding new shelve
  shelfName: string = '';
  editingName = false;

  selectedShelf = signal<Shelf | null>(null);
  shelves = signal<Shelf[]>([]);

  constructor(private shelfService: ShelfService, private userService: UserService) {
  }

  ngOnInit() {
    this.shelfService.getShelves(this.userService.getUser()?.id!).subscribe(shelves => {
      console.log(shelves);
      this.shelves.set(shelves);
    });
  }

  addShelf(){
    this.shelfService.addShelf(this.shelfName).subscribe(shelf => {
      this.shelves.update(shelves => [...shelves, shelf]);
    })
  }

  selectShelf(shelf: Shelf){
    this.shelfService.getShelf(shelf.id).subscribe(newShelf => {
      console.log(newShelf);
      this.selectedShelf.set(newShelf);
    })
  }

  editShelf(){
    this.shelfName = this.selectedShelf()?.name!;
    this.editingName = true;
  }

  submitEditedShelf(){
    this.shelfService.editShelf(this.selectedShelf()?.id!, this.shelfName).subscribe(shelf => {
      console.log(shelf);
      this.shelves.update(shelves => shelves.map(s => s.id === shelf.id ? { ...s, ...shelf } : s));
      console.log(this.shelves());
      this.editingName=false;
    });
  }

  deleteShelf(shelf: Shelf){
    this.shelfService.deleteShelf(shelf.id).subscribe(_ => {
      this.shelves.update(shelves => shelves.filter(s => s.id !== shelf.id));
    });
    this.selectedShelf.set(null);
  }

  deleteBookFromShelf(id: number){
    this.shelfService.deleteBookFromShelf(this.selectedShelf()?.id!, id)
      .subscribe(_ => {
        const updatedBooks = this.selectedShelf()?.books!.filter(book => book.id !== id);
        this.selectedShelf.set({
          ...this.selectedShelf()!,
          books: updatedBooks!
        });
      })
  }

}
