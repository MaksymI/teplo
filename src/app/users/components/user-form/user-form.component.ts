import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { User } from '../../models/user.model';
import { UserArrayService } from '../../services/user-array.service';
import { DialogService, CanComponentDeactivate } from '../../../.';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user: User;
  originalUser: User;

  constructor(
    private userArrayService: UserArrayService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = { ...data.user };
      this.originalUser = { ...data.user };
    });
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
    this.router.navigate(['./../../'], { relativeTo: this.route });
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
