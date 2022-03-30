import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { AuthService } from 'angular4-social-login';
import { AppGlobals } from 'src/app/app.global';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { Sources } from 'src/app/source.model';
import { PaymentToCompanyEntryService } from '../paymenttocompany-entry/paymenttocompany-entry.service';

import { CheckfordeleteService } from './checkfordelete.service';

@Component({
  selector: 'app-checkfordelete',
  templateUrl: './checkfordelete.component.html',
  styleUrls: ['./checkfordelete.component.scss']
})
export class CheckforsubmitComponent implements OnInit {

  obj1!: Sources;
  vale!: Sources[]
  res: any;
  lastDark: any 
  constructor(public dialogRef: MatDialogRef<CheckforsubmitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _msg: MessageBoxService,
      // private _auth: AuthService,
      private _globals: AppGlobals,
    private dapiService: PaymentToCompanyEntryService,
        private invoiceservice: CheckfordeleteService) { }

  ngOnInit() {
    this.lastDark = this.data
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

  // onYesClick(): void{
  //   this.invoiceservice.getDelete(this.data.statusId).subscribe((result) => {
  //     this.dialogRef.close();
  //   })
  // }
  onYesClick(): void {

    // this.data.forEach((Object)=> this.light.forEach((obj)=>
    // {
    //   if(Object.tableColumnId === obj.tableColumnId){
    //     Object.value = obj.value
    //   }

    // }));
    // this.childElemInit.forEach((Object)=> this.childElem.forEach((obj)=>
    // {
    //   if(Object.tableColumnId === obj.tableColumnId){
    //     Object.value = obj.value
    //   }

    // }));

    // console.log(JSON.stringify(this.data))

    for(let i=0;i<=this.data.length;i++){
      this.obj1 = this.data[i];
       if(this.obj1 ){
        //  this.last.records.push(this.obj1);
         this.lastDark.records.push(this.obj1);
       }
     }

    //  console.log(JSON.stringify(this.last));
    //  console.log("Dark",JSON.stringify(this.lastDark));

     for(let i=0; i< this.lastDark.child1.length;i++){
       this.lastDark.child1[i].records[0].value = "0"
      //  this.lastDark.child1[i].records[1].value = this.lastDark.records[0].value
       this.vale = this.lastDark.child1[i].records
       this.vale.forEach((val) => {
         val.entryMode = "A"
       })
     }

     this.lastDark.records.sort(function(a:any, b:any) { 
      return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
    });
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      this.lastDark.child1[i].records.sort(function(a:any, b:any) { 
        return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
      });
    }
    for (let i = 0; i < this.lastDark.child2.length; i++) {
      this.lastDark.child2[i].records.sort(function(a:any, b:any) { 
        return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
      });
    }
    for (let i = 0; i < this.lastDark.child3.length; i++) {
      this.lastDark.child3[i].records.sort(function(a:any, b:any) { 
        return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
      });
    }
    for (let i = 0; i < this.lastDark.child4.length; i++) {
      this.lastDark.child4[i].records.sort(function(a:any, b:any) { 
        return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
      });
    }

     console.log("Dark",JSON.stringify(this.lastDark));

     
      
          if(this.lastDark.records[0].entryMode == "A"){
            console.log('Last:', JSON.stringify(this.lastDark));
           this.dapiService.EntryA(this.lastDark).subscribe(nexto => {
             this.res = nexto;
             if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
              this._msg.showInfo("Message", "Saved succesfully");
            this.dialogRef.close();
            }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
              this._msg.showInfo("رسالة", "تم الحفظ بنجاح");
            this.dialogRef.close();
            }
     
           }, error => {
             console.log(error);
             if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
              this._msg.showInfo("Message", "Error!!");
            this.dialogRef.close();
            }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
              
              this._msg.showInfo("رسالة", "توجد مشكلة");
            this.dialogRef.close();
            }
           });
         }else if(this.lastDark.records[0].entryMode == "E"){
           this.dapiService.EntryE(this.lastDark).subscribe(nexto => {
             this.res = nexto;
             if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
              this._msg.showInfo("Message", "Saved succesfully");
            this.dialogRef.close();
            }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
              this._msg.showInfo("رسالة", "تم الحفظ بنجاح");
            this.dialogRef.close();
            }
     
           }, error => {
             console.log(error);
             if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
              this._msg.showInfo("Message", "Error!!");
            this.dialogRef.close();
            }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
              
              this._msg.showInfo("خطأ!!", "توجد مشكلة");
            this.dialogRef.close();
            }
           });
         }
        
      
      
      

    

      }

}
