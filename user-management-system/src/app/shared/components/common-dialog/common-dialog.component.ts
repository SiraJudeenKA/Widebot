/**
 * Component used to show the dialog box message
 */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss']
})
export class CommonDialogComponent {
  /**
   * Contructor used to inject the service to used in component
   * @param inputData has the input data from the component
   * @param dialogRef used for emit the value for true
   */
  constructor(@Inject(MAT_DIALOG_DATA) public inputData: any, public dialogRef: MatDialogRef<CommonDialogComponent>) { }
  /**
   * Method used to click okay to emit the value of true.
   */
  onClickofOkay() {
    this.dialogRef.close(true);
  }
}
