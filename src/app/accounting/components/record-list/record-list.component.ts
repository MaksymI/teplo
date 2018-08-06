import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Record } from '../../models/record.model';
import { RecordPromiseService } from '../../services';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {
  records: Array<Record>;

  constructor(
    private router: Router,
    private recordPromiseService: RecordPromiseService
  ) { }

  ngOnInit() {
    this.getRecords().catch(err => console.log(err));
  }

  onSaveRecord(record: Record): void {
    this.updateRecord(record).catch(err => console.log(err));
  }

  onEditRecord(record: Record): void {
    const link = ['/edit', record._id];
    this.router.navigate(link);
  }

  onCreateRecord(): void {
    const link = ['/add'];
    this.router.navigate(link);
  }

  private async getRecords() {
    this.records = await this.recordPromiseService.getRecords();
  }

  private async updateRecord(record: Record) {
    const updatedRecord = await this.recordPromiseService.updateRecord({
      ...record,
      saved: true
    });

    if (updatedRecord) {
      const index = this.records.findIndex(r => r._id === updatedRecord._id);
      if (index > -1) {
        this.records.splice(index, 1, updatedRecord);
      }
    }
  }

}
