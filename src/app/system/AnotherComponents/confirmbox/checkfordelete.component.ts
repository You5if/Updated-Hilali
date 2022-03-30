import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppGlobals } from 'src/app/app.global';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { Sources } from 'src/app/source.model';

import { CheckfordeleteService } from './checkfordelete.service';

@Component({
  selector: 'app-checkfordelete',
  templateUrl: './checkfordelete.component.html',
  styleUrls: ['./checkfordelete.component.scss']
})
export class ConfBoxComponent implements OnInit {

  res: any;
  vale!: Sources[]
  obj1!: Sources;
  constructor(public dialogRef: MatDialogRef<ConfBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data2: any,
    private _globals: AppGlobals,
    private _msg: MessageBoxService,
        private dapiService: CheckfordeleteService) { }

  ngOnInit() {
  }
  

  onNoClick(): void {
    localStorage.setItem(this._globals.baseAppName + '_Confirm', 'no')
    this.dialogRef.close();
  }

  onYesClick(): void{
    for(let i=0;i<=this.data2.data.length;i++){
      this.obj1 = this.data2.data[i];
       if(this.obj1 ){
        //  this.last.records.push(this.obj1);
         this.data2.arr.records.push(this.obj1);
       }
     }

    //  console.log(JSON.stringify(this.last));
    //  console.log("Dark",JSON.stringify(this.lastDark));

     for(let i=0; i< this.data2.arr.child1.length;i++){
       this.data2.arr.child1[i].records[0].value = "0"
      //  this.lastDark.child1[i].records[1].value = this.lastDark.records[0].value
       this.vale = this.data2.arr.child1[i].records
       this.vale.forEach((val) => {
         val.entryMode = "A"
       })
     }

     this.data2.arr.records.sort(function(a:any, b:any) { 
      return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
    });
    for (let i = 0; i < this.data2.arr.child1.length; i++) {
      this.data2.arr.child1[i].records.sort(function(a:any, b:any) { 
        return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
      });
    }
    for (let i = 0; i < this.data2.arr.child2.length; i++) {
      this.data2.arr.child2[i].records.sort(function(a:any, b:any) { 
        return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
      });
    }
    for (let i = 0; i < this.data2.arr.child3.length; i++) {
      this.data2.arr.child3[i].records.sort(function(a:any, b:any) { 
        return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
      });
    }
    for (let i = 0; i < this.data2.arr.child4.length; i++) {
      this.data2.arr.child4[i].records.sort(function(a:any, b:any) { 
        return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
      });
    }

     console.log("Dark",JSON.stringify(this.data2.arr));
    if(this.data2.arr.records[0].entryMode == "A"){
      console.log('Last:', JSON.stringify(this.data2.arr));
     this.dapiService.getSubmit(this.data2.name, 'createuniv', this.data2.arr).subscribe(nexto => {
       this.res = nexto;
       if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        this._msg.showInfo("Message", "Saved succesfully");
      this.dialogRef.close();
      localStorage.setItem(this._globals.baseAppName + '_Confirm', 'yes')
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        this._msg.showInfo("رسالة", "تم الحفظ بنجاح");
        localStorage.setItem(this._globals.baseAppName + '_Confirm', 'yes')
      this.dialogRef.close();
      }

     }, error => {
       console.log(error);
       if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        this._msg.showInfo("Message", "Error!!");
        localStorage.setItem(this._globals.baseAppName + '_Confirm', 'no')
      this.dialogRef.close();
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        
        this._msg.showInfo("رسالة", "توجد مشكلة");
        localStorage.setItem(this._globals.baseAppName + '_Confirm', 'no')
      this.dialogRef.close();
      }
     });
   }else if(this.data2.arr.records[0].entryMode == "E"){
     this.dapiService.getSubmit(this.data2.name, 'edituniv', this.data2.arr).subscribe(nexto => {
       this.res = nexto;
       if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        this._msg.showInfo("Message", "Saved succesfully");
        localStorage.setItem(this._globals.baseAppName + '_Confirm', 'yes')
      this.dialogRef.close();
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        this._msg.showInfo("رسالة", "تم حفظ بنجاح");
        localStorage.setItem(this._globals.baseAppName + '_Confirm', 'yes')
      this.dialogRef.close();
      }

     }, error => {
       console.log(error);
       if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        this._msg.showInfo("Message", "Error!!");
        localStorage.setItem(this._globals.baseAppName + '_Confirm', 'no')
      this.dialogRef.close();
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        
        this._msg.showInfo("خطأ!!", "توجد مشكلة");
        localStorage.setItem(this._globals.baseAppName + '_Confirm', 'no')
      this.dialogRef.close();
      }
     });
   }
    // this.invoiceservice.getSubmit(this.data.name, this.data.action, this.data.arr).subscribe((result) => {
    //   this.dialogRef.close();
    // })
  }

}
