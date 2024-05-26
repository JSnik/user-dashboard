import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  get logStatement(): boolean {
    if (JSON.parse(localStorage.getItem('logIn')!)) {
      return true;
    } else {
      return false
    }
  }

  clearStorage() {
    localStorage.removeItem('logIn');
    localStorage.removeItem('isAdmin')
  }
}
