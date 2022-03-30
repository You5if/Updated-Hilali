import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteModel } from '../../journalentry.model';

import { CheckfordeleteService } from './checkfordelete.service';

@Component({
  selector: 'app-checkfordelete',
  templateUrl: './checkfordelete.component.html',
  styleUrls: ['./checkfordelete.component.scss']
})
export class CheckforstateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CheckforstateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
        private invoiceservice: CheckfordeleteService) { }

  ngOnInit() {
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void{
    this.invoiceservice.getDelete(this.data.statusId).subscribe((result) => {
      this.dialogRef.close();
    })
  }

}
