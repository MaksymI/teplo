import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { AdminRoutingModule, adminRouterComponents } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule
  ],
  declarations: [adminRouterComponents]
})
export class AdminModule { }
