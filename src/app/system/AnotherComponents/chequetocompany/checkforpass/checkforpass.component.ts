import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CheckforpassService } from './checkforpass.service';

@Component({
  selector: 'app-checkforpass',
  templateUrl: './checkforpass.component.html',
  styleUrls: ['./checkforpass.component.scss']
})
export class CheckforpassComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CheckforpassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
        private service: CheckforpassService) { }

  ngOnInit() {
    console.log(this.data);
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void{
    this.service.getPassOrFail(this.data.url, this.data.id).subscribe((result) => {
      this.dialogRef.close();
    })
  }
}
