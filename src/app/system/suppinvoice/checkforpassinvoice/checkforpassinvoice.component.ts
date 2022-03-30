import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppGlobals } from 'src/app/app.global';
import { StockPIEntryComponent } from '../stockpi-entry/stockpi-entry.component';

@Component({
  selector: 'app-checkforpassinvoice',
  templateUrl: './checkforpassinvoice.component.html',
  styleUrls: ['./checkforpassinvoice.component.scss']
})
export class CheckforpassinvoiceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CheckforpassinvoiceComponent>,
   public dialogRef2: MatDialogRef<StockPIEntryComponent>,
    public dialog: MatDialog,
    private _globals: AppGlobals,
    @Inject(MAT_DIALOG_DATA) public data1: any,
        ) { }

  ngOnInit() {
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void{
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Add");
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add Stock");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة للمخزون");
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Add");
    }
    this.dialogRef2 = this.dialog.open(StockPIEntryComponent, {
      disableClose: true,
      data: {
          entryData: { tableId: 81,
          recordId: 0,
          userId: 26,
          roleId: 2,
          languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
        },
        suppInvId: this.data1.suppId
      }

    });
  
  this.dialogRef2.afterClosed().subscribe(() => {
    this.dialogRef.close();
  });
  }

}
