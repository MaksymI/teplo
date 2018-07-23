import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-leave-dialog',
  templateUrl: './leave-dialog.component.html',
  styleUrls: ['./leave-dialog.component.css']
})
export class LeaveDialogComponent {

  constructor(private dialogRef: MatDialogRef<LeaveDialogComponent>, @Inject(MAT_DIALOG_DATA) public data : any) {}

  public closeDialog(result){
    this.dialogRef.close(result);
  }

}
