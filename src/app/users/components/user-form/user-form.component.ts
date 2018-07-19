import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { User } from '../../models/user.model';
import { UserArrayService } from '../../services/user-array.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {
  user: User;
  originalUser: User;

  private sub: Subscription;

  constructor(
    private userArrayService: UserArrayService,
    private route: ActivatedRoute,
    private router: Router
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
}
