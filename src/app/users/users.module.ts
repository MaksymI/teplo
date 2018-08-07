import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { UserComponent, UserArrayService, UserResolveGuard, UserObservableService } from '.';

import { UsersRoutingModule, userRouterComponents } from './users-routing.module';
import { UsersAPIProvider } from './users.config';


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
  providers: [
    UserArrayService,
    UserResolveGuard,
    UsersAPIProvider,
    UserObservableService
  ]
})
export class UsersModule { }
