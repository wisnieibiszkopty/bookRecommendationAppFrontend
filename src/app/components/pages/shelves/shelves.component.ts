import {Component, OnInit, signal, ViewChild} from '@angular/core';
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
import {ToolbarModule} from 'primeng/toolbar';
import {ConfirmPopup, ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService, MessageService} from 'primeng/api';
import {NgClass} from '@angular/common';

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
    ShelveComponent,
    ToolbarModule,
    ConfirmPopupModule,
    NgClass
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

  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  constructor(
    private shelfService: ShelfService,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
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
      //this.selectedShelf.update((uShelf: Shelf) => ({...uShelf, name: shelf.name}));
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

  acceptDeleting(){
    this.confirmPopup.accept();
  }

  rejectDeleting(){
    this.confirmPopup.reject();
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this shelf?',
      accept: () => {
        this.deleteShelf(this.selectedShelf()!);
        this.messageService.add({ severity: 'info', summary: 'Deleted', detail: 'Shelf deleted', life: 3000 });
      },
      reject: () => {}
    });
  }

}
