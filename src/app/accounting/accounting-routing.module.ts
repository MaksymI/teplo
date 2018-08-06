import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordListComponent, RecordFormComponent } from '.';

const routes: Routes = [
  {
    path: 'record-list',
    component: RecordListComponent,
    data: {
      title: 'Records manager',
      meta: [
        {
          name: 'description',
          content: 'Record Manager Application. This is an SPA'
        },
        {
          name: 'keywords',
          content: 'MaksymI pet project, SPA, learning, Angular 6'
        }
      ]
    }
  },
  {
    path: 'add',
    component: RecordFormComponent
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
