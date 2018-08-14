import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AccountingEffects, recordsReducer } from '../+store';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AccountingRoutingModule } from './accounting-routing.module';
import { RecordListComponent, RecordComponent, RecordFormComponent, RecordPromiseService } from '.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    AccountingRoutingModule,
    StoreModule.forFeature('records', recordsReducer),
    EffectsModule.forFeature([AccountingEffects])
  ],
  declarations: [RecordListComponent, RecordComponent, RecordFormComponent],
  providers: [RecordPromiseService]
})
export class AccountingModule { }
