import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-records-filter',
  templateUrl: './records-filter.component.html',
  styleUrls: ['./records-filter.component.css']
})
export class RecordsFilterComponent implements OnInit {

  saveds: string[] = ['clear filter', 'true', 'false'];

  @Output()
  selectFilter: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSelect(value): void {
    this.selectFilter.emit(value);
  }



}
