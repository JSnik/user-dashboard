import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-main',
  templateUrl: './auth-main.component.html',
  styleUrls: ['./auth-main.component.scss']
})
export class AuthMainComponent implements OnInit{
  // @ts-ignore
  public loginForm: FormGroup;
  // @ts-ignore
  public registerForm: FormGroup;
  // @ts-ignore
  public activeTabIndex: number = 0;
  public loginNotSuccess: boolean = false;
  public registerNotSuccess: boolean = false;

  private emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  // @ts-ignore
  private storageUsers: string;
  // @ts-ignore
  private storageIslogIn: boolean;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required]
    })

    this.registerForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required]
    })

    this.storageUsers = localStorage.getItem('users')!;
    this.storageIslogIn = JSON.parse(localStorage.getItem('logIn')!);
    this.reload();
  }

  reload(): void {
    if (!localStorage.getItem('users')) {
      location.reload()
    }
  }

  submit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const users: any[] = JSON.parse(this.storageUsers);
    const matchedUser = users.find(user => user.email === email && user.password === password);
    if (email === 'admin@gmail.com' && password === 'admin123') {
      localStorage.setItem('isAdmin', JSON.stringify(true))
    } else {
      localStorage.setItem('isAdmin', JSON.stringify(false))
    }
    if (matchedUser) {
      this.loginNotSuccess = false;
      localStorage.setItem('logIn', JSON.stringify(true));
      this.router.navigate(['../users']);
    } else {
      this.loginNotSuccess = true;
    }
  }

  register() {
    const username = this.registerForm.value.username;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const users: any[] = JSON.parse(this.storageUsers);
    const matchedUser = users.find(user => user.email === email || user.username === username);
    if (matchedUser) {
      this.registerNotSuccess = true;
    } else {
      this.registerNotSuccess = false;
      localStorage.setItem('logIn', JSON.stringify(true));
      const highestId = users.reduce((maxId, user) => Math.max(maxId, user.id), -1);
      users.push({
        email: email,
        password: password,
        username: username,
        isAdmin: false,
      });
      localStorage.setItem('users', JSON.stringify(users));
      this.router.navigate(['../users']);
    }
  }

  tabChange(event: any) {
    this.activeTabIndex = event.index;
  }
}
