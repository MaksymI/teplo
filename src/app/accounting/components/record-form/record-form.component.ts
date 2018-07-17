import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Record } from '../../models/record.model';
import { RecordArrayService } from '../../services/record-array.service'

@Component({
  selector: 'app-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css']
})
export class RecordFormComponent implements OnInit {
  record: Record;

  constructor(
    private route: ActivatedRoute,
    private recordArrayService: RecordArrayService
  ) { }

  ngOnInit(): void {
    this.record = new Record(null, null, null);

    this.route.paramMap
    .pipe(
      switchMap((params: Params) =>
        this.recordArrayService.getRecord(+params.get('recordID'))
      )
    )
    .subscribe(record => (this.record = {...record}), err => console.log(err));
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