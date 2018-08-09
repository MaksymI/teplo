import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable, Subscription } from 'rxjs';

import { User } from '../../models/user.model';
import { UserObservableService } from '../../services';
import { DialogService, CanComponentDeactivate } from '../../..';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  user: User;
  originalUser: User;

  private sub: Subscription;

  constructor(
    private userObservableService: UserObservableService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = { ...data.user };
      this.originalUser = { ...data.user };
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSaveUser() {
    const user = { ...this.user };

    const method = user._id ? 'updateUser' : 'createUser';
    this.sub = this.userObservableService[method](user).subscribe(
      () => {
        this.originalUser = { ...this.user };
        user._id
          ? this.router.navigate(['users', { editedUserID: user._id }])
          : this.goBack();
      },
      error => console.log(error)
    );
  }

  goBack() {
    // this.router.navigate(['./../../'], { relativeTo: this.route });
    this.location.back();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const flags = Object.keys(this.originalUser).map(key => {
      if (this.originalUser[key] === this.user[key]) {
        return true;
      }
      return false;
    });

    if (flags.every(el => el)) {
      return true;
    }
    return this.dialogService.confirm('Discard changes?');
  }
}
