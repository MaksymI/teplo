import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { UserComponent, UserArrayService } from '.';

import { UsersRoutingModule, userRouterComponents } from './users-routing.module';

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
    userRouterComponents
  ],
  providers: [ UserArrayService ]
})
export class UsersModule { }
