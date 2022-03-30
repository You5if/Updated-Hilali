import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CheckfordeleteService } from './checkfordelete.service';

@Component({
  selector: 'app-checkfordelete',
  templateUrl: './checkfordelete.component.html',
  styleUrls: ['./checkfordelete.component.scss']
})
export class CheckforstateCompComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CheckforstateCompComponent>,
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
