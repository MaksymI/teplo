import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { User } from '../../models/user.model';
import { UserArrayService } from '../../services/user-array.service';
import { DialogService, CanComponentDeactivate } from '../../../.';

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
    private userArrayService: UserArrayService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.user = new User(null, '', '');

    const id = +this.route.snapshot.paramMap.get('userID');
    this.sub = this.userArrayService.getUser(id).subscribe(
      user => {
        this.user = { ...user };
      },
      err => console.log(err)
    );
    this.originalUser = { ...this.user };
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSaveUser() {
    const user = { ...this.user };

    if (user.id) {
      this.userArrayService.updateUser(user);
      this.router.navigate(['/users', { editedUserID: user.id }]);
    } else {
      this.userArrayService.addUser(user);
      this.goBack();
    }
    this.originalUser = { ...this.user };
  }

  goBack() {
    this.router.navigate(['./../../'], { relativeTo: this.route })
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const flags = Object.keys(this.originalUser).map(key => {
      if(this.originalUser[key] === this.user[key]) {
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
