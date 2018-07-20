import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  AdminComponent,
  AdminDashboardComponent,
  ManageRecordsComponent,
  ManageUsersComponent
} from '.';

import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'users', component: ManageUsersComponent },
          { path: 'records', component: ManageRecordsComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

export const adminRouterComponents = [
  AdminComponent,
  AdminDashboardComponent,
  ManageRecordsComponent,
  ManageUsersComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
