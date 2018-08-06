import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Record } from '../../models/record.model';
import { RecordPromiseService } from '../../services/';

@Component({
  selector: 'app-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css']
})
export class RecordFormComponent implements OnInit {
  record: Record;
  method: String;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private recordPromiseService: RecordPromiseService
  ) { }

  ngOnInit(): void {
    this.record = new Record(null, null, null);

    this.route.paramMap
    .pipe(
      switchMap((params: Params) => {
        return params.get('recordID')
          ? this.recordPromiseService.getRecord(params.get('recordID'))
          // : Promise.resolve(null);
          : Promise.resolve(this.record);
      })
    )
    .subscribe(record => {
        this.record = {...record};
        this.method = record._id ? 'CHANGE' : 'CREATE';
      },
      err => console.log(err)
    );
  }

  onChangeRecord() {
    const record = { ...this.record, ...{saved: false} };

    const method = record._id ? 'updateRecord' : 'createRecord';
    this.recordPromiseService[method](record)
      .then(() => this.goBack())
      .catch(err => console.log(err));
  }

  goBack(): void {
    this.location.back();
  }

}
