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
    DividerModule
  ],
  templateUrl: './shelves.component.html',
  styleUrl: './shelves.component.scss'
})
export class ShelvesComponent implements OnInit{
  // for adding new shelve
  shelfName: string = '';
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

  editShelf(shelf: Shelf){

  }

  deleteShelf(shelf: Shelf){
    this.shelfService.deleteShelf(shelf.id).subscribe(_ => {
      // not deleting record from list
      this.shelves.update(shelves => shelves.filter(s => s.id !== shelf.id));
    });
    this.selectedShelf.set(null);
  }

}
