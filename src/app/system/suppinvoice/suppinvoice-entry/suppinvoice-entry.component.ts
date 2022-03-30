import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';
import { AppGlobals } from 'src/app/app.global';
import { Send } from 'src/app/send.model';
import { Sources } from 'src/app/source.model';
import { SuppInvoiceEntryService } from './suppinvoice-entry.service';
import { productPricingModel } from '../suppinvoice.model';
import { Direction } from '@angular/cdk/bidi';

@Component({
  selector: 'app-suppinvoice-entry',
  templateUrl: './suppinvoice-entry.component.html',
  styleUrls: ['./suppinvoice-entry.component.scss']
})

export class SuppInvoiceEntryComponent implements OnInit {

	url!: string;
  checkParentAccountId!:any
  total!: number;
  totalTax!: number;
  totalE!: string;
  subTotalE!: string;
  subTotal!: number;
  model2!: Send ;
  model3!: Send ;

    model: Send = {
      tableId: 75,
      recordId: 0,
      userId: +this._auth.getUserId(),
      roleId: Number(localStorage.getItem('role')),
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };

    childElem: any = {
      records: [],
      auditColumn: {
        approvalStatusId: 1100001,
        companyId: 10001,
        branchId: 201,
        financialYearId: 1,
        userId: 1,
        mACAddress: "unidentified",
        hostName: "unidentified",
        iPAddress: "unidentified",
        deviceType: "Win32"
      }
    }
    childElem2: any = {
      records: [],
      auditColumn: {
        approvalStatusId: 1100001,
        companyId: 10001,
        branchId: 201,
        financialYearId: 1,
        userId: 1,
        mACAddress: "unidentified",
        hostName: "unidentified",
        iPAddress: "unidentified",
        deviceType: "Win32"
      }
    }
    childElem3: any = {
      records: [],
      auditColumn: {
        approvalStatusId: 1100001,
        companyId: 10001,
        branchId: 201,
        financialYearId: 1,
        userId: 1,
        mACAddress: "unidentified",
        hostName: "unidentified",
        iPAddress: "unidentified",
        deviceType: "Win32"
      }
    }
    childElemDark2: any = {
      records: [],
      auditColumn: {
        approvalStatusId: 1100001,
        companyId: 10001,
        branchId: 201,
        financialYearId: 1,
        userId: 1,
        mACAddress: "unidentified",
        hostName: "unidentified",
        iPAddress: "unidentified",
        deviceType: "Win32"
      }
    }
    childElemDark3: any = {
      records: [],
      auditColumn: {
        approvalStatusId: 1100001,
        companyId: 10001,
        branchId: 201,
        financialYearId: 1,
        userId: 1,
        mACAddress: "unidentified",
        hostName: "unidentified",
        iPAddress: "unidentified",
        deviceType: "Win32"
      }
    }
     
    last: any = {
      records: [],
      child1: [],
      child2: [],
      auditColumn: {
        approvalStatusId: 1100001,
        companyId: 10001,
        branchId: 201,
        financialYearId: 1,
        userId: 1,
        mACAddress: "unidentified",
        hostName: "unidentified",
        iPAddress: "unidentified",
        deviceType: "Win32"
      }
  
    }
    lastDark: any = {
      records: [],
      child1: [],
      child2: [],
      auditColumn: {
        approvalStatusId: 1100001,
        companyId: 10001,
        branchId: 201,
        financialYearId: 1,
        userId: 1,
        mACAddress: "unidentified",
        hostName: "unidentified",
        iPAddress: "unidentified",
        deviceType: "Win32"
      }
  
    }
    myFormGroup!: FormGroup;
  alarray!: Sources[];
  alanum!: string;

  breakpoint!: number;
  checked= false;
  checkedR = false;
  disabled = false;
  sources: Sources[] = [];
  res: any;
  spacepoint: any;
  spacezone!: boolean;
  data!: Sources[];
  ver!: Sources;
  maxSize!: number;
  submit!: string;
  cancel!: string;
  stringOfV!: string;
  refString!: string;

  light: Sources[] = [];
  dark: Sources[] = [];
  

  ver2!: Sources;
  verCh2!: Sources;
  verCh3!: Sources;
  ver3!: Sources;
  ver4!: Sources;
  obj1!: Sources;
  obj2!: Sources;
  records: Sources[] = []

  direction!: Direction;

  dropItem!: Sources;
  dropItemchild!: Sources;
  dropItemTax!: Sources;
  container: any[][] =[];

  accountList: SelectModel[] = [];

  dialog_title: string|null = localStorage.getItem(this._globals.baseAppName + '_Add&Edit');

  dropList: Sources[] = [];
  dropListItem: Sources[] = [];
  dropListTax: Sources[] = [];
  // childElem: Sources[] = [];
  childElemInit: Sources[] = [];
  childElemDark: Sources[] = [];
  childElemInit3: Sources[] = [];
  

  num: number = 10;
  child1Data: any;
  vale!: Sources[]


  constructor(
	  private dapiService: SuppInvoiceEntryService,
      private _ui: UIService,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _globals: AppGlobals,
      private _select: SelectService,
      private dialogRef: MatDialogRef<SuppInvoiceEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: Send
  ) { }

  ngOnInit() {
    this.subTotal = 0
    this.totalTax = 0

    this.child1Data = this.last.child1;
    // console

    if(localStorage.getItem(this._globals.baseAppName + '_Add&Edit2') == "Add") {
      console.log("dot");
      
      this.addChild1ExpenseItem(0)
      
    }
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        this.direction = "ltr"
        this.submit = "Submit"
        this.cancel = "Cancel"
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        this.direction = "rtl"
        this.submit = "ارسال"
        this.cancel = "الغاء"
      }

      this._ui.loadingStateChanged.next(true);
      this.dapiService.Controllers(this.pModel).subscribe(res => {
        this._ui.loadingStateChanged.next(false);
        this.data = res;
        console.log(this.data);
        
        if(localStorage.getItem(this._globals.baseAppName + '_Add&Edit2') == "Edit") {
          console.log(this.data.length)
        if(this.data.length > 0) {
          console.log(this.data[0].value)
  
          this.dapiService.getChild1byChild1(+this.data[0].value).subscribe((res) => {
    
            console.log("EditRes",res)
          this._ui.loadingStateChanged.next(false);
          
            
  
            
            for(let k=0;k<res.length;k++){
              this.addChild1ExpenseItem(res[k].suppInvoiceProductId)
              
              
              
            }
            
            
            
           
  
  
      
    }
    
  
            
            
            
          
          )
        }else {
          this.addChild1ExpenseItem(0)
        }
        
       
        
      }
  
        for(let i=0;i<=this.data.length;i++){
          this.ver2 = this.data[i]
          if (this.ver2 && this.ver2.inTransaction && this.ver2.access != "NoAccess"){
            if (this.ver2.type === "dropdown") {
              this.dropList.push(this.ver2);
              console.log("droplist: ",this.dropList)
            }
            this.light.push(this.ver2);
  
          }else{
            if(this.ver2) {
              this.dark.push(this.ver2);
            }
          }
        }
        this.breakpoint =
        window.innerWidth <= 960
          ? 1
          : this.data[0].maxRowSize;
  
        for(let k=0;k<=this.dropList.length;k++) {
          this.dropItem = this.dropList[k]
  
          this._select.getDropdown(this.dropItem.refId, this.dropItem.refTable, this.dropItem.refColumn, this.dropItem.refCondition, false).subscribe((res: SelectModel[]) => {
          this.dropList[k].myarray = res;
          this.container.push(res);
      });
  
        }  
      })
  }

  onParent(){}

  addChild1ExpenseItem(id:number) {  
    let myElem = {
      records: []as any[],
      auditColumn: {
        approvalStatusId: 1100001,
        companyId: 10001,
        branchId: 201,
        financialYearId: 1,
        userId: 1,
        mACAddress: "unidentified",
        hostName: "unidentified",
        iPAddress: "unidentified",
        deviceType: "Win32"
      }
    }
    let childElemDark2 = {
      records: []as any[],
      auditColumn: {
        approvalStatusId: 1100001,
        companyId: 10001,
        branchId: 201,
        financialYearId: 1,
        userId: 1,
        mACAddress: "unidentified",
        hostName: "unidentified",
        iPAddress: "unidentified",
        deviceType: "Win32"
      }
    }
    this.model2 = {
      tableId: 76,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    this._ui.loadingStateChanged.next(true);
    this.dapiService.child1Controllers(this.model2).subscribe((res) => {
      this._ui.loadingStateChanged.next(false);

      this.childElemInit = res
      console.log(this.childElemInit)
      this.dropListItem.push(this.childElemInit[2])
      this.dropListItem.push(this.childElemInit[4])
      for(let k=0;k<this.dropListItem.length;k++) {
        console.log("loop cycle" + k)
        this.dropItemchild = this.dropListItem[k]
        console.log("DropitemTax", this.dropItemchild)

            // this.tableId = this.dropItem.refId;
            // this.tableName = this.dropItem.refTable;
            // this.displayColumn = this.dropItem.refColumn;
            // this.condition = this.dropItem.refCondition;
            
            
            if(this.dropItemchild.tableColumnId == 615) {
              var dt = new Date(this.data[2].value);
              console.log("Al:", +this.data[6].value);
              this.dropItemchild.idCount = this.dropItemchild.value
              this._select.getDropdown(this.dropItemchild.refId, this.dropItemchild.refTable, this.dropItemchild.refColumn, this.dropItemchild.refCondition, false).subscribe((res: SelectModel[]) => {
                console.log("drop: ", res);
                this.dropListItem[k].myarray = res;
                this.onChangeValue(+this.dropListItem[k].value, (k/2) )
              });
              // this.dapiService.getProductPricing2(+this.childElemInit[2].value, +this.data[6].value, this.data[2].value).subscribe((result) => {
              //   this.dropItemchild.myarray = result
              //   console.log("Alaa:", this.dropItemchild.myarray);
              //   for (let i = 0; i < this.dropItemchild.myarray.length; i++) {
              //     if (this.dropItemchild.myarray[i].unitId == +this.dropItemchild.value) {
              //       console.log("Tes");
                    
              //       this.childElemInit[5].value = this.dropItemchild.myarray[i].unitPrice
              //       this.childElemInit[6].value = (+this.childElemInit[3].value * this.dropItemchild.myarray[i].unitPrice).toString()
              //     }
                  
              //   }
                
              // })

            }else {
              this._select.getDropdown(this.dropItemchild.refId, this.dropItemchild.refTable, this.dropItemchild.refColumn, this.dropItemchild.refCondition, false).subscribe((res: SelectModel[]) => {
                console.log("drop: ", res);
                this.dropListItem[k].myarray = res;
                this.onChangeValue(+this.dropListItem[k].value, (k/2) )
              });
            }

            
            
          
        
        // this.container.push(res);
        // console.log(this.container)


    
  }

  
      

      for(let i=0;i<this.childElemInit.length;i++){
        this.verCh2 = this.childElemInit[i]
        childElemDark2.records.push(this.verCh2);
        

      }
      this.lastDark.child1.push(childElemDark2);
      this.allTotal()
      this.childElemInit.forEach((itemE) =>{
        if (itemE && itemE.inTransaction && itemE.access != "NoAccess"){
          
          // this.childElem.records.push(itemE);
          myElem.records.push(itemE)
          
  
        }else{
          
            this.childElemDark.push(this.verCh2);
            // console.log(this.childElemDark)
          
  
  
        }
      })
      
      // this.childElem = res
      // console.log(JSON.stringify(this.child1Data))
      this.childElem2 = null
      this.childElem2 = this.childElem

      //this.last.child1.push(this.childElem2);
      this.last.child1.push(myElem)
      
      
      
      
      
     
      
    })
    console.log("child1 final", this.last)
    console.log("DarlDarl",this.lastDark)
    console.log(this.data);
    
    
    
    

    
    
    

    

    
  }
  
  

  allTotal() {
    console.log(this.data);
    console.log(this.lastDark);
    console.log(this.lastDark.child1.length);

    
    this.totalTax = 0
    this.total = 0
    this.subTotal = 0
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      if (this.lastDark.child1[i] && this.lastDark.child1[i].records[3].tableColumnId == 616) {
        this.subTotal += (this.lastDark.child1[i].records[3].value * this.lastDark.child1[i].records[5].value )
        console.log(this.subTotal);
      }
    }
    this.subTotal  = this.subTotal - +this.data[4].value 
      
  }

  onAmountChange(e: Event, id:any): void {
    let searchValue=(<HTMLInputElement>e.target).value
    // this.elem[this.selectedElement].reference = searchValue
    console.log(searchValue)
    console.log(this.lastDark.child1[0].records[3]);
    this.subTotal = 0
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      if (this.lastDark.child1[i] && this.lastDark.child1[i].records[3].tableColumnId == 616) {
        this.subTotal += (this.lastDark.child1[i].records[3].value * this.lastDark.child1[i].records[5].value )
        console.log(this.subTotal);
      }
    }
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      if (this.lastDark.child1[i] == this.lastDark.child1[id]) {
        this.lastDark.child1[i].records[6].value = this.lastDark.child1[i].records[3].value * this.lastDark.child1[i].records[5].value
        
      }
      
    }
    this.subTotal = 0
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      if (this.lastDark.child1[i] && this.lastDark.child1[i].records[3].tableColumnId == 616) {
        this.subTotal += (this.lastDark.child1[i].records[3].value * this.lastDark.child1[i].records[5].value )
        console.log(this.subTotal);
      }
    }
    
    
  }

  onDiscountChange(searchValue: string): void {
    // this.elem[this.selectedElement].reference = searchValue
    console.log(searchValue)
    if(searchValue == "24001"){
      var per: number
      console.log(this.data[4].value);
      per = +this.data[4].value / 100
      this.subTotal = 0
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      if (this.lastDark.child1[i] && this.lastDark.child1[i].records[3].tableColumnId == 616) {
        this.subTotal += (this.lastDark.child1[i].records[3].value * this.lastDark.child1[i].records[5].value )
        console.log(this.subTotal);
      }
    }
    this.subTotal = this.subTotal - (this.subTotal * per)
    
      
    }else if(searchValue == "24002"){
      console.log(this.data[4].value);
      this.subTotal = 0
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      if (this.lastDark.child1[i] && this.lastDark.child1[i].records[3].tableColumnId == 616) {
        this.subTotal += (this.lastDark.child1[i].records[3].value * this.lastDark.child1[i].records[5].value )
        console.log(this.subTotal);
      }
    }
    this.subTotal  = this.subTotal - +this.data[4].value
      
    }
    if (this.lastDark.child2.length > 0) {
      this.totalTax = 0
    for (let i = 0; i < this.lastDark.child2.length; i++) {
      if (this.lastDark.child2[i] && this.lastDark.child2[i].records[2].tableColumnId == 298) {
        this._select.getDropdown("taxId", "tax", "convert(nvarchar,taxAmount)", "active=1 and deleted=0 and taxId="+this.lastDark.child2[i].records[2].value, false).subscribe((result) => {
          this.totalTax += +result[0].name
          console.log("totalTax",this.totalTax);
          this.total = this.subTotal + (this.subTotal * this.totalTax / 100)
      })
      }
    }
    }else {
      this.total = this.subTotal
    }
    
    
  }
  onChangeCurrency(idC: number){
    for (let c = 0; c < this.lastDark.child1.length; c++) {
    // this.dapiService.getProductPricing2(+this.lastDark.child1[c].records[2].value, idC, this.data[2].value).subscribe((resu: productPricingModel) => {
    //   this._ui.loadingStateChanged.next(false);
    //   console.log(resu)
    //   this.lastDark.child1[c].records[4].myarray = resu
    //   console.log(this.alarray)
    //   for (let i = 0; i < this.alarray[2].myarray.length; i++) {
    //     if (this.lastDark.child1[c].records[4].myarray[i].unitId == +this.last.child1[c].records[2].value) {
    //       this.lastDark.child1[c].records[5].value = this.lastDark.child1[c].records[4].myarray[i].unitPrice
    //       this.lastDark.child1[c].records[6].value = (this.lastDark.child1[c].records[3].value * this.lastDark.child1[c].records[4].myarray[i].unitPrice).toString()
    //     }
        
    //   }
    // })
  }
  }
  onChangeDate(e: Event){
    let idD=(<HTMLInputElement>e.target).value
    for (let c = 0; c < this.lastDark.child1.length; c++) {
    // this.dapiService.getProductPricing2(+this.lastDark.child1[c].records[2].value, +this.data[6].value, idD.toString()).subscribe((resu: productPricingModel) => {
    //   this._ui.loadingStateChanged.next(false);
    //   console.log(resu)
    //   this.lastDark.child1[c].records[4].myarray = resu
    //   console.log(this.alarray)
    //   for (let i = 0; i < this.alarray[2].myarray.length; i++) {
    //     if (this.lastDark.child1[c].records[4].myarray[i].unitId == +this.last.child1[c].records[2].value) {
    //       this.lastDark.child1[c].records[5].value = this.lastDark.child1[c].records[4].myarray[i].unitPrice
    //       this.lastDark.child1[c].records[6].value = (this.lastDark.child1[c].records[3].value * this.lastDark.child1[c].records[4].myarray[i].unitPrice).toString()
    //     }
        
    //   }
    // })
  }
  }

  onDiscountAmountChange(e: Event) {
    let searchValue=(<HTMLInputElement>e.target).value
    console.log(searchValue)
    if(this.data[3].value == "24001"){
      var per: number
      console.log(this.data[4].value);
      per = +searchValue / 100
      this.subTotal = 0
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      if (this.lastDark.child1[i] && this.lastDark.child1[i].records[3].tableColumnId == 616) {
        this.subTotal += (this.lastDark.child1[i].records[3].value * this.lastDark.child1[i].records[5].value )
        console.log(this.subTotal);
      }
    }
    this.subTotal = this.subTotal - (this.subTotal * per)
    
      
    }else if(this.data[3].value == "24002"){
      
      this.subTotal = 0
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      if (this.lastDark.child1[i] && this.lastDark.child1[i].records[3].tableColumnId == 616) {
        this.subTotal += (this.lastDark.child1[i].records[3].value * this.lastDark.child1[i].records[5].value )
        console.log(this.subTotal);
      }
    }
    this.subTotal  = this.subTotal - +searchValue
      
    }else{
      
      this.subTotal = 0
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      if (this.lastDark.child1[i] && this.lastDark.child1[i].records[3].tableColumnId == 616) {
        this.subTotal += (this.lastDark.child1[i].records[3].value * this.lastDark.child1[i].records[5].value )
        console.log(this.subTotal);
      }
    }
    this.subTotal  = this.subTotal - +searchValue
      
    }
    if (this.lastDark.child2.length > 0) {
      this.totalTax = 0
    for (let i = 0; i < this.lastDark.child2.length; i++) {
      if (this.lastDark.child2[i] && this.lastDark.child2[i].records[2].tableColumnId == 298) {
        this._select.getDropdown("taxId", "tax", "convert(nvarchar,taxAmount)", "active=1 and deleted=0 and taxId="+this.lastDark.child2[i].records[2].value, false).subscribe((result) => {
          this.totalTax += +result[0].name
          console.log("totalTax",this.totalTax);
          this.total = this.subTotal + (this.subTotal * this.totalTax / 100)
      })
      }
    }
    }else {
      this.total = this.subTotal
    }
  }

  onChangeValue(id: number, id2: number) {
    this._ui.loadingStateChanged.next(true);
    
    this.dapiService.getProductPricing2(id, 17001, this.data[2].value).subscribe((resu: productPricingModel) => {
      this._ui.loadingStateChanged.next(false);
      console.log(resu)
      this.alarray = this.last.child1[id2].records
      console.log(this.alarray)
      this.alarray.forEach((element) => {
        if(element.tableColumnId == 615){
          if (element.idCount != element.value) {
            this.alarray.forEach((element2) => {
              if(element.tableColumnId == 617){
                element.myarray = resu
              }
              if (element2.tableColumnId == 618) {
                element2.value = "0.00"
              }else if (element2.tableColumnId == 619) {
                element2.value = "0.00"
              }
            })
            this.allTotal()
      
          }
        }else if(element.tableColumnId == 617){
          element.myarray = resu
        }
      });
    })
    // for (let i = 0; i < this.alarray[2].myarray.length; i++) {
    //   if (this.alarray[2].myarray[i].unitId == id) {
    //     this.alarray[3].value = this.alarray[2].myarray[i].unitPrice
    //     this.alarray[4].value = (+this.alarray[1].value * this.alarray[2].myarray[i].unitPrice).toString()
    //   }
      
    // }
    
  }
  onChangeValueC(id: number) {
    this.stringOfV = id.toString()
    console.log("working fine")
    for(let k=0;k<=this.dropList.length;k++) {
      
      if(this.dropList[k].tableColumnId == 287) {
        this.dropItem = this.dropList[k]
        this.refString = this.dropItem.refCondition + this.stringOfV
        this._select.getDropdown(this.dropItem.refId, this.dropItem.refTable, this.dropItem.refColumn, this.refString, false).subscribe((res: SelectModel[]) => {
          console.log("drop: ", res);
          this.dropList[k].myarray = res;
          this.container.push(res);
          console.log(this.container)
  
  
      });
      
      }
      

    }
  }

  onChange1(id: number, id2: number) {
    console.log(this.alarray);
    console.log(id, id2);
    
    for (let i = 0; i < this.alarray[2].myarray.length; i++) {
      if (this.alarray[2].myarray[i].id == id) {
        this.alarray[3].value = this.alarray[2].myarray[i].unitPrice
        this.alarray[4].value = (+this.alarray[1].value * this.alarray[2].myarray[i].unitPrice).toString()
      }
      
    }
  
      this.subTotal = 0
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      if (this.lastDark.child1[i] && this.lastDark.child1[i].records[3].tableColumnId == 616) {
        this.subTotal += (this.lastDark.child1[i].records[3].value * this.lastDark.child1[i].records[5].value )
        console.log(this.subTotal);
      }
    }
    this.subTotal  = this.subTotal - +this.data[4].value 
      
    
    

    
  }

  onChangeTax(searchValue: string, id:number) {
    console.log(searchValue, id);
    console.log(this.subTotal);
    
    
    this.totalTax = 0
    if(this.data[3].value == "24001"){
      var per: number
      console.log(this.data[4].value);
      per = +this.data[4].value / 100
      this.subTotal = 0
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      if (this.lastDark.child1[i] && this.lastDark.child1[i].records[3].tableColumnId == 616) {
        this.subTotal += (this.lastDark.child1[i].records[3].value * this.lastDark.child1[i].records[5].value )
        console.log(this.subTotal);
      }
    }
    this.subTotal = this.subTotal - (this.subTotal * per)
    
      
    }else if(this.data[3].value == "24002"){
      
      this.subTotal = 0
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      if (this.lastDark.child1[i] && this.lastDark.child1[i].records[3].tableColumnId == 616) {
        this.subTotal += (this.lastDark.child1[i].records[3].value * this.lastDark.child1[i].records[5].value )
        console.log(this.subTotal);
      }
    }
    this.subTotal  = this.subTotal - +this.data[4].value 
      
    }else{
      
      this.subTotal = 0
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      if (this.lastDark.child1[i] && this.lastDark.child1[i].records[3].tableColumnId == 616) {
        this.subTotal += (this.lastDark.child1[i].records[3].value * this.lastDark.child1[i].records[5].value )
        console.log(this.subTotal);
      }
    }
    this.subTotal  = this.subTotal - +this.data[4].value 
      
    }
    
      this.totalTax = 0
    for (let i = 0; i < this.lastDark.child2.length; i++) {
      if (this.lastDark.child2[i] && this.lastDark.child2[i].records[2].tableColumnId == 298) {
        this._select.getDropdown("taxId", "tax", "convert(nvarchar,taxAmount)", "active=1 and deleted=0 and taxId="+this.lastDark.child2[i].records[2].value, false).subscribe((result) => {
          this.totalTax += +result[0].name
          console.log("totalTax",this.totalTax);
          this.total = this.subTotal + (this.subTotal * this.totalTax / 100)
      })
      }
    }
    
    
    
    
    
    
      
  }


  deleteFun(id: number) {
    console.log('I ran from delete');
    // this.elem.splice(id, 1);
    
    this.last.child1.splice(id, 1)
    if(this.last.child1.length == 0){
      this.addChild1ExpenseItem(0)
    }
    this.lastDark.child1.splice(id, 1)
    if(this.data[3].value == "24001"){
      var per: number
      console.log(this.data[4].value);
      per = +this.data[4].value / 100
      this.subTotal = 0
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      if (this.lastDark.child1[i] && this.lastDark.child1[i].records[3].tableColumnId == 616) {
        this.subTotal += (this.lastDark.child1[i].records[3].value * this.lastDark.child1[i].records[5].value )
        console.log(this.subTotal);
      }
    }
    this.subTotal = this.subTotal - (this.subTotal * per)
    
      
    }else if(this.data[3].value == "24002"){
      
      this.subTotal = 0
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      if (this.lastDark.child1[i] && this.lastDark.child1[i].records[3].tableColumnId == 616) {
        this.subTotal += (this.lastDark.child1[i].records[3].value * this.lastDark.child1[i].records[5].value )
        console.log(this.subTotal);
      }
    }
    this.subTotal  = this.subTotal - +this.data[4].value 
      
    }else{
      
      this.subTotal = 0
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      if (this.lastDark.child1[i] && this.lastDark.child1[i].records[3].tableColumnId == 616) {
        this.subTotal += (this.lastDark.child1[i].records[3].value * this.lastDark.child1[i].records[5].value )
        console.log(this.subTotal);
      }
    }
    this.subTotal  = this.subTotal - +this.data[4].value 
      
    }
    if (this.lastDark.child2.length > 0) {
      this.totalTax = 0
    for (let i = 0; i < this.lastDark.child2.length; i++) {
      if (this.lastDark.child2[i] && this.lastDark.child2[i].records[2].tableColumnId == 298) {
        this._select.getDropdown("taxId", "tax", "convert(nvarchar,taxAmount)", "active=1 and deleted=0 and taxId="+this.lastDark.child2[i].records[2].value, false).subscribe((result) => {
          this.totalTax += +result[0].name
          console.log("totalTax",this.totalTax);
          this.total = this.subTotal + (this.subTotal * this.totalTax / 100)
      })
      }
    }
    }else {
      this.total = this.subTotal
    }
    }
  deleteFun2(id: number) {
    console.log('I ran from delete');
    // this.elem.splice(id, 1);
    this.last.child2.splice(id, 1)
    // if(this.last.child2.length == 0){
    //   this.addChild1ExpenseItem(0)
    // }
    this.lastDark.child2.splice(id, 1)
    this.totalTax = 0
    if(this.data[3].value == "24001"){
      var per: number
      console.log(this.data[4].value);
      per = +this.data[4].value / 100
      this.subTotal = 0
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      if (this.lastDark.child1[i] && this.lastDark.child1[i].records[3].tableColumnId == 616) {
        this.subTotal += (this.lastDark.child1[i].records[3].value * this.lastDark.child1[i].records[5].value )
        console.log(this.subTotal);
      }
    }
    this.subTotal = this.subTotal - (this.subTotal * per)
    
      
    }else if(this.data[3].value == "24002"){
      
      this.subTotal = 0
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      if (this.lastDark.child1[i] && this.lastDark.child1[i].records[3].tableColumnId == 616) {
        this.subTotal += (this.lastDark.child1[i].records[3].value * this.lastDark.child1[i].records[5].value )
        console.log(this.subTotal);
      }
    }
    this.subTotal  = this.subTotal - +this.data[4].value 
      
    }else{
      
      this.subTotal = 0
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      if (this.lastDark.child1[i] && this.lastDark.child1[i].records[3].tableColumnId == 616) {
        this.subTotal += (this.lastDark.child1[i].records[3].value * this.lastDark.child1[i].records[5].value )
        console.log(this.subTotal);
      }
    }
    this.subTotal  = this.subTotal - +this.data[4].value 
      
    }
    if (this.lastDark.child2.length > 0) {
      this.totalTax = 0
    for (let i = 0; i < this.lastDark.child2.length; i++) {
      if (this.lastDark.child2[i] && this.lastDark.child2[i].records[2].tableColumnId == 298) {
        this._select.getDropdown("taxId", "tax", "convert(nvarchar,taxAmount)", "active=1 and deleted=0 and taxId="+this.lastDark.child2[i].records[2].value, false).subscribe((result) => {
          this.totalTax += +result[0].name
          console.log("totalTax",this.totalTax);
          this.total = this.subTotal + (this.subTotal * this.totalTax / 100)
      })
      }
    }
    }else {
      this.total = this.subTotal
    }
    }

    onSubmit() {

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
         if (this.lastDark.child1[0].records[3].value == "0.000000") {
          this.lastDark.child1.splice(0, 1)
         }
         this.lastDark.child1[i].records[0].value = "0"
         this.lastDark.child1[i].records[1].value = this.lastDark.records[0].value
         this.vale = this.lastDark.child1[i].records
         this.vale.forEach((val) => {
           val.entryMode = "A"
         })
       }
  
       console.log("Dark",this.lastDark);
  
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
       
      
       console.log("Dark",this.lastDark);
        
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
                this._msg.showInfo("رسالة", "تم حفظ بنجاح");
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

  onResize(event:any) {
    this.spacepoint =
      event.target.innerWidth <= 960
        ? (this.spacezone = false)
        : (this.spacezone = true);
    this.breakpoint =
      event.target.innerWidth <= 960
        ? 1
        : this.data[0].maxRowSize;
  }

  onCancel() {
    this.dialogRef.close();
  }
}

