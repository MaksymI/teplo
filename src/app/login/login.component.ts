import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: IUser;
  loading: boolean = false;
  username : string
  password : string

  constructor(private router : Router) {
  }

  ngOnInit() {
    this.user = {};
  }

  login() : void {
    if (this.username == 'admin' && this.password == 'admin') {
     this.router.navigate([""]);
    } else {
      alert("Invalid credentials");
    }
  }

  cancel(): void {
    this.router.navigate([""]);
  }

}
