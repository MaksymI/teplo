import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { AccountingRoutingModule } from './accounting-routing.module';
import { RecordListComponent, RecordComponent } from '.';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AccountingRoutingModule
  ],
  declarations: [RecordListComponent, RecordComponent]
})
export class AccountingModule { }
