import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IUser } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: IUser;
  loading: boolean = false;
  responseData: any;

  constructor(private auth: AuthService, private router : Router) {
  }

  ngOnInit() {
    this.user = {};
  }

  login() : void {
    this.auth.login(this.user).subscribe(
      data => {
        console.log(`login data is ${data}`)
        this.responseData = data;
        this.router.navigate([""]);
      },
      err => console.log(`onLogin err is ${err}`)
   );
  }

  cancel(): void {
    this.router.navigate([""]);
  }

}
