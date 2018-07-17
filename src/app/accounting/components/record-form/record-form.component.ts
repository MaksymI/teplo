import { Component, OnInit } from '@angular/core';

import { Record } from '../../models/record.model';
import { RecordArrayService } from '../../services/record-array.service'

@Component({
  selector: 'app-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css']
})
export class RecordFormComponent implements OnInit {
  record: Record;

  constructor(private recordArrayService: RecordArrayService) { }

  ngOnInit(): void {
    this.record = new Record(null, null, null);
  }

  onSaveRecord() {
    const record = { ...this.record };

    if(record.id) {
      this.recordArrayService.updateRecord(record);
    } else {
      this.recordArrayService.addRecord(record);
    }
  }

  goBack(): void {}

}
