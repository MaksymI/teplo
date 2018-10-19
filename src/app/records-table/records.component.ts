import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  fleetData: any = [];
  dataSource = new MatTableDataSource(this.fleetData);

  constructor() { }

  ngOnInit() {
  }

}
