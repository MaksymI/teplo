import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Record } from '../../models/record.model';
import { RecordArrayService, RecordPromiseService } from '../../services/';

@Component({
  selector: 'app-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css']
})
export class RecordFormComponent implements OnInit {
  record: Record;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private recordArrayService: RecordArrayService,
    private recordPromiseService: RecordPromiseService
  ) { }

  ngOnInit(): void {
    this.record = new Record(null, null, null);

    this.route.paramMap
    .pipe(
      switchMap((params: Params) =>
        this.recordPromiseService.getRecord(+params.get('recordID'))
      )
    )
    .subscribe(record => (this.record = {...record}), err => console.log(err));
  }

  onChangeRecord() {
    const record = { ...this.record, ...{saved: false} };

    if (record.id) {
      this.recordArrayService.updateRecord(record);
    } else {
      this.recordArrayService.addRecord(record);
    }

    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

}
