import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = JSON.parse(localStorage.getItem('logIn')!);
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']); // Navigate to login or any other route if not logged in
      return false;
    }
  }
}
