import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordListComponent, RecordFormComponent } from '.';

const routes: Routes = [
  {
    path: 'record-list',
    component: RecordListComponent
  },
  {
    path: 'edit/:recordID',
    component: RecordFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
