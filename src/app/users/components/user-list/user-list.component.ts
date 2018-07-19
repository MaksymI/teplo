import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, of, throwError } from 'rxjs';

import { User } from '../../models/user.model';
import { UserArrayService } from '../../services/user-array.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userArrayService: UserArrayService
  ) {}

  ngOnInit() {
    this.users$ = this.userArrayService.getUsers();
  }

  onEditUser(user: User) {
    const link = ['/users/edit', user.id];
    this.router.navigate(link);
    // or
    // const link = ['edit', user.id];
    // this.router.navigate(link, {relativeTo: this.route});
  }

}
