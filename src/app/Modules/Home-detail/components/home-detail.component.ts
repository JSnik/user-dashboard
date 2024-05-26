import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HomeService} from "../../Home/services/home.service";
import {User} from "../../Home/models/users.model";
import {catchError, Subject, takeUntil, throwError} from "rxjs";

@Component({
  selector: 'app-components-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeDetailComponent implements OnInit, OnDestroy {
  // @ts-ignore
  private id: string;
  // @ts-ignore
  public userObj: User;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private _homeService: HomeService, private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    // @ts-ignore
    this.id = this.route._futureSnapshot.params.id;
    this.getUser(this.id);
  }

  getUser(id: string) {
    this._homeService.getSpecificUser(+id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((item: User) => {
        const storage: any[] = JSON.parse(localStorage.getItem('users')!);
        const index = storage.findIndex(user => +id === user.id);
        this.userObj = storage[index];
        this.cdr.markForCheck();
      })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  editInStorage(): void {
    const storage: any[] = JSON.parse(localStorage.getItem('users')!);
    const index = storage.findIndex(user => this.userObj.id === user.id);
    if (index !== -1) {
      storage[index] = { ...storage[index], ...this.userObj };
      localStorage.setItem('users', JSON.stringify(storage));
    }
  }

  saveEdit($event: any) {
    this._homeService.editUser($event.id, $event)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: User) => {
        this.userObj = {...data};
        this.editInStorage();
        this.cdr.detectChanges();
      })
  }
}
