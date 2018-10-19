import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RecordsTableRoutingModule } from './records-table-routing.module';

import { RecordsTableComponent } from './components/records-table/records-table.component';
import { RecordsFilterComponent } from './components/records-filter/records-filter.component';
import { RecordsComponent } from './records.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    RecordsTableRoutingModule
  ],
  declarations: [
    RecordsTableComponent,
    RecordsFilterComponent,
    RecordsComponent
  ]
})
export class RecordsTableModule { }
