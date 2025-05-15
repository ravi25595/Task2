import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-my-dialog',
  imports: [MatDialogContent,MatDialogActions, MatDialogModule,MatButtonModule],
  templateUrl: './my-dialog.component.html',
  styleUrl: './my-dialog.component.scss'
})
export class MyDialogComponent {
  /**
   *
   */
  constructor(
    public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onCancel() {
    this.dialogRef.close(false);
  }
  onConfirm(){
    this.dialogRef.close(true);
  }
}
