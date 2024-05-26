import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  ngOnInit() {
    if (localStorage.getItem('users')) {
      return
    } else {
      const admin = {
        email: 'admin@gmail.com',
        password: 'admin123',
        isAdmin: true,
      }
      localStorage.setItem('users', JSON.stringify([admin]));
      localStorage.setItem('logIn', JSON.stringify(false));
    }
  }
}
