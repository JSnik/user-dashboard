import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {HomeService} from "../services/home.service";
import {User} from "../models/users.model";
import {filter, Subject, takeUntil} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-components',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  // @ts-ignore
  public userData: User[];
  public displayedColumns: string[] = ['id', 'name', 'username', 'email'];
  public clickedRows = new Set<User>();
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private _homeService: HomeService, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    this._homeService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((item: User[]) => {
        this.userData = item;
        this.cdr.markForCheck();
        const usersStorage = JSON.parse(localStorage.getItem('users')!);
        const combined = [...usersStorage, ...this.userData];
        const uniqueUsers = combined.filter((user, index, self) =>
          index === self.findIndex((u) => u.email === user.email)
        );
        localStorage.setItem('users', JSON.stringify(uniqueUsers));
        this.combineAllUsers();
      });
  }

  combineAllUsers(): void {
    const data = JSON.parse(localStorage.getItem('users')!);
    this.userData = [];
    this.userData = [...data];
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  showDetail(detail: any) {
    if (detail.id) {
      this.router.navigate(['/users', detail.id])
    } else {
      alert('ხელით დარეგისტრირებული უზერი ვერ რედაქტირდება რადგანაც არააქვს Id')
    }
  }
}
