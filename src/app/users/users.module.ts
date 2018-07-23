import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { UserComponent, UserArrayService } from '.';

import { UsersRoutingModule, userRouterComponents } from './users-routing.module';
import { LeaveDialogComponent } from './components/user-form/leave-dialog/leave-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    UsersRoutingModule
  ],
  declarations: [
    UserComponent,
    userRouterComponents,
    LeaveDialogComponent
  ],
  providers: [ UserArrayService ],
  entryComponents: [ LeaveDialogComponent ]
})
export class UsersModule { }
