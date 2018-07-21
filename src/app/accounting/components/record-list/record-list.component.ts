import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Record } from '../../models/record.model';
import { RecordArrayService } from '../../services/record-array.service';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {
  records: Array<Record>;

  constructor(
    private router: Router,
    private recordArrayService: RecordArrayService
  ) { }

  ngOnInit() {
    this.getRecords().catch(err => console.log(err));
  }

  onSaveRecord(record: Record): void {
    this.recordArrayService.saveRecord(record);
  }

  onEditRecord(record: Record): void {
    const link = ['/edit', record.id];
    this.router.navigate(link);
  }

  private async getRecords() {
    this.records = await this.recordArrayService.getRecords();
  }

}
