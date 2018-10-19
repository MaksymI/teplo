import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordsComponent } from './records.component';

const routes: Routes = [
  {
    path: 'record-table',
    component: RecordsComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordsTableRoutingModule { }
