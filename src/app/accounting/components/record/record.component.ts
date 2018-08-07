import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
 } from '@angular/core';
 import { Record } from '../../models/record.model';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordComponent {
  @Input() record: Record;

  @Output() saveRecord = new EventEmitter<Record>();
  @Output() editRecord = new EventEmitter<Record>();
  @Output() deleteRecord = new EventEmitter<Record>();

  onSaveRecord(): void {
    this.saveRecord.emit(this.record);
  }

  onEditRecord(): void {
    this.editRecord.emit(this.record);
  }

  onDeleteRecord(): void {
    this.deleteRecord.emit(this.record);
  }
}
