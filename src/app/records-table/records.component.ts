import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { RecordPromiseService } from '../accounting/services/record-promise.service';


@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  fleetData: any = [];
  dataSource = new MatTableDataSource(this.fleetData);

  constructor(private recordPromiseService: RecordPromiseService) { }

  ngOnInit() {
    this.recordPromiseService.getRecordsObservable().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  onSelectFiter(value) {
    value === 'clear filter' ? this.dataSource.filter = '' : this.dataSource.filter = value;
  }

}
