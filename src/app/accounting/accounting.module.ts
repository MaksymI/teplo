import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AccountingRoutingModule } from './accounting-routing.module';
import { RecordListComponent, RecordComponent, RecordFormComponent } from '.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    AccountingRoutingModule
  ],
  declarations: [RecordListComponent, RecordComponent, RecordFormComponent]
})
export class AccountingModule { }
