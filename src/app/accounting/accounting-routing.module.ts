import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordListComponent } from '.';

const routes: Routes = [
  {
    path: 'record-list',
    component: RecordListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
