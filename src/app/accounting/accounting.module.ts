import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { RecordListComponent } from './components/record-list/record-list.component';

@NgModule({
  imports: [
    CommonModule,
    AccountingRoutingModule
  ],
  declarations: [RecordListComponent]
})
export class AccountingModule { }
