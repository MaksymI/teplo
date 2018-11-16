import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Record } from '../../../accounting/models/record.model';

@Component({
  selector: 'app-records-table',
  templateUrl: './records-table.component.html',
  styleUrls: ['./records-table.component.css']
})
export class RecordsTableComponent implements OnInit {

<<<<<<< HEAD
  expand = false;
  expandValue = 'Expand';
=======
>>>>>>> 1e35d54c068f858d83f746f0b24cc4ce2feb4d05
  displayedColumns: string[] = ['_id', 'value', 'date', 'saved'];
  @Input()
  dataSource: MatTableDataSource<Record[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onExpand() {
    this.expand = !this.expand;
    this.expand ? this.expandValue = 'Collapse' : this.expandValue = 'Expand';
  }
}

