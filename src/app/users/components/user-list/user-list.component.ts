import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../../models/user.model';
import { UserArrayService, UserObservableService } from '../../services';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;

  private editedUser: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userArrayService: UserArrayService,
    private userObservableService: UserObservableService
  ) {}

  ngOnInit() {
    this.users$ = this.userObservableService.getUsers();

    this.route.paramMap
      .pipe(
        switchMap((params: Params) =>
          this.userArrayService.getUser(+params.get('editedUserID'))
        )
      )
      .subscribe(
        (user: User) => {
          this.editedUser = { ...user };
          console.log(
            `last time you edited user ${JSON.stringify(this.editedUser)}`
          );
        },
        err => console.log(err)
      );
  }

  onEditUser(user: User) {
    const link = ['/users/edit', user.id];
    this.router.navigate(link);
    // or
    // const link = ['edit', user.id];
    // this.router.navigate(link, {relativeTo: this.route});
  }

  isEdited(user: User) {
    if (this.editedUser) {
      return user.id === this.editedUser.id;
    }
    return false;
  }

}
