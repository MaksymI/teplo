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

<<<<<<< HEAD
  expand = false;
  expandValue = 'Expand';

=======
>>>>>>> 1e35d54c068f858d83f746f0b24cc4ce2feb4d05
  constructor(private recordPromiseService: RecordPromiseService) { }

  ngOnInit() {
    this.recordPromiseService.getRecordsObservable().subscribe(data => {
      this.dataSource.data = data;
    });
<<<<<<< HEAD
  }

  onSelectFiter(value) {
    value === 'clear filter' ? this.dataSource.filter = '' : this.dataSource.filter = value;
  }

  onExpand() {
    this.expand = !this.expand;
    this.expand ? this.expandValue = 'Collapse' : this.expandValue = 'Expand';
=======
>>>>>>> 1e35d54c068f858d83f746f0b24cc4ce2feb4d05
  }

}
