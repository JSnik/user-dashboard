import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {User} from "../../../Home/models/users.model";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnChanges{
  // @ts-ignore
  @Input() user: User;
  @Output() event = new EventEmitter(); // Here's where you use EventEmitter
  // @ts-ignore
  public editableUser: User;
  public isEdit: boolean = false;

  public get isAdmin(): boolean {
    if (JSON.parse(localStorage.getItem('isAdmin')!)) {
      return true
    } else {
      return false
    }
  }

  edit(): void {
    this.isEdit = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.editableUser = {...this.user};
  }

  emitSave() {
    this.event.emit(this.editableUser);
    this.isEdit = false
  }
}
