import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { PaymentfromEntryComponent } from './paymenttocompany-entry/paymenttocompany-entry.component';
import { PaymentToCompanyModel } from './paymenttocompany.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { PaymentToCompanyService } from './paymenttocompany.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';
import { SelectionModel } from '@angular/cdk/collections';

import { FilterService } from 'src/app/components/filter/filter.service';
import { AlertifyService } from 'src/app/alertify.service';
import { DeleteModel } from '../invoice/invoice.model';
import { MySortComponent } from '../../journalentry/operation/my-sort/my-sort.component';
import { MyFilterComponent } from '../../journalentry/operation/my-filter/my-filter.component';
import { CheckfordeleteComponent } from '../../journalentry/operation/checkfordelete/checkfordelete.component';
import { CheckforstateComp2Component } from './statecheck/checkfordelete.component';
import { Direction } from '@angular/cdk/bidi';

@Component({
    selector: 'app-paymenttocompany',
    templateUrl: './paymenttocompany.component.html',
    styleUrls: ['./paymenttocompany.component.scss']
  })

export class PaymentfromComponent implements OnInit {

  idS! : number;
  direction!: Direction;
  customerCode!: string;
  customerName!: string;
  customerMobile!: string;
  customer!: string;
  amount!: string;
  currency!: string;
  balance!: string;
  edit!: string;
  header!: string;
  submit!: string;
  cancel!: string;
  state!:string;
  selection = new SelectionModel<PaymentToCompanyModel>(true, []);;

  role = localStorage.getItem("role");
  model!: Send;
    displayedColumns!: string[]
    dataSource: any;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;
    pageData: any
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    deleteModel!: DeleteModel
      opC: boolean = true
    paymentDate!:string;
    paymentCode!:string;
    paymentType!:string;
    delete!: string
    indexes!: any[]
    clickedRows = new Set<PaymentToCompanyModel>();

    totalRecords!: number;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    screenRights: RightModel = {
        amendFlag: true,
        createFlag: true,
        deleteFlag: true,
        editFlag: true,
        exportFlag: true,
        printFlag: true,
        reverseFlag: true,
        shortCloseFlag: true,
        viewFlag: true
      };

    constructor(
        public dialog: MatDialog,
        private _cf: CommonService,
        private _globals: AppGlobals,
        private _ui: UIService,
        private alertify: AlertifyService,
        private _msg: MessageBoxService,
        private _auth: AuthService,
        private _select: SelectService,
        private paymenttocompanyservice: PaymentToCompanyService
      ) {
        this.pTableName = 'PaymentFromCompany';
        this.pScreenId = 59;
        this.pTableId = 59;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
    console.log(localStorage.getItem("role"));

    if (this.role === '2') {
      this.displayedColumns =
        ['select','PaymentDate', 'PaymentCode', 'PaymentType', 'amount', 'state'];

    } else if (this.role === '4') {
      this.displayedColumns =
        ['select','PaymentDate', 'PaymentCode', 'PaymentType', 'amount'];

    }else if (this.role === '5') {
      this.displayedColumns =
        ['select','PaymentDate', 'PaymentCode', 'PaymentType', 'amount', 'state'];

    }
    
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.header = "Expense"
      this.paymentCode = "Payment code"
      this.paymentDate = "Payment date"
      this.paymentType = "Payment type"
      this.customer = "Customer"
      this.state = "State"
      this.amount = "Amount"
      this.delete = "Delete"
      this.currency = "Currency"
      this.edit = "Edit"
      this.submit = "Submit"
      this.cancel = "Cancel"
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "المصروفات"
      this.paymentCode = "رمز الدفع"
      this.paymentDate = "تاريخ الدفع"
      this.paymentType = "نوع الدفع"
      this.customer = "العميل"
      this.delete = "مسح"
      this.state = "الحالة"
      this.amount = "المبلغ"
      this.currency = "العملة"
      // this.accountCode = "رمز الحساب"
      // this.accountName = "اسم الحساب"
      // this.accountType = "نوع الحساب"
      this.balance = "الحساب"
      this.edit = "تعديل"
      this.submit = "ارسال"
      this.cancel = "الغاء"
    }
    this.pageData = {
      tableId: this.pTableId,
      userId: this._auth.getUserId(),
      recordsPerPage: 10,
      pageNo: 1,
      sort: '',
      filter: ""
    }
      this.refreshMe();
  }

  refreshMe() {
    this._cf.getPageData('PaymentFromCompany', this.pScreenId, this._auth.getUserId(), this.pTableId,
      this.recordsPerPage, this.currentPageIndex, false).subscribe(
        (result) => {
          this.totalRecords = result[0].totalRecords;
          this.recordsPerPage = this.recordsPerPage;
          this.dataSource = new MatTableDataSource(result);
          this.indexes = result
        }
      );

    this._auth.getScreenRights(this.menuId).subscribe((rights: RightModel) => {
      this.screenRights = {
        amendFlag: true,
        createFlag: true,
        deleteFlag: true,
        editFlag: true,
        exportFlag: true,
        printFlag: true,
        reverseFlag: true,
        shortCloseFlag: true,
        viewFlag: true
      };
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onState  (id: number, a:any) {
    
    var stateModel = {
      statusId :id
    }
    this._ui.loadingStateChanged.next(true);
    this.opC = false
    this.openState(stateModel);
    this._ui.loadingStateChanged.next(false);

};

openState  (result: any) {
  const dialogRef = this.dialog.open(CheckforstateComp2Component, {
    disableClose: true,
    
    data: result
  });
dialogRef.afterClosed().subscribe(() => {
  this.refreshMe();
});
};
  paginatoryOperation(event: PageEvent) {
    try {
      this._cf.getPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
        this.pTableId, this.totalRecords).subscribe(
          (result: any) => {
            this._ui.loadingStateChanged.next(false);
            this.totalRecords = result[0].totalRecords;
            this.recordsPerPage = event.pageSize;
            this.dataSource = result;
          }, error => {
            this._ui.loadingStateChanged.next(false);
            this._msg.showAPIError(error);
            return false;
          });
    } catch (error:any) {
      this._ui.loadingStateChanged.next(false);
      this._msg.showAPIError(error);
      return false;
    }
  }

  onSort  () {
    const dialogRef = this.dialog.open(PageSortComponent, {
      disableClose: true,
      data: this.pTableId
    });
  };

  onMySort  () {
    
    const dialogRef = this.dialog.open(MySortComponent, {
      disableClose: true,
      data: {
        tableId: 59,
        recordId: 0,
        userId: this._auth.getUserId(),
        roleId: Number(this.role),
        languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
      }
    });
  
  dialogRef.afterClosed().subscribe(() => {
    this.refreshMe();
  });
  this.paginator.firstPage()
}

onClearSort() {
  this.pageData.sort = ""
  this._cf.setSort("")
  // this.invoiceservice.setFilter("")
  this._ui.loadingStateChanged.next(true);
  this._cf.newGetPageData(this.pTableName, this.pageData).subscribe((result) => {
    this._ui.loadingStateChanged.next(false);
    this.totalRecords = result[0].totalRecords;
        this.recordsPerPage = this.recordsPerPage;
        this.dataSource = new MatTableDataSource(result);
        this.indexes = result
  })
  this.paginator.firstPage()
}

onClearFilter() {
  this.pageData.filter = ""
  // this.invoiceservice.setSort("")
  this._cf.setFilter("")
  this._ui.loadingStateChanged.next(true);
  this._cf.newGetPageData(this.pTableName, this.pageData).subscribe((result) => {
    this._ui.loadingStateChanged.next(false);
    this.totalRecords = result[0].totalRecords;
        this.recordsPerPage = this.recordsPerPage;
        this.dataSource = new MatTableDataSource(result);
        this.indexes = result
  })
  this.paginator.firstPage()
}

onMyFilter  () {

  const dialogRef = this.dialog.open(MyFilterComponent, {
      disableClose: true,
      data: {
        tableId: 59,
        recordId: 0,
        userId: this._auth.getUserId(),
        roleId: Number(this.role),
        languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
      }
    });
  
  dialogRef.afterClosed().subscribe(() => {
    this.refreshMe();
  });
  this.paginator.firstPage()
}

  onAdd  () {
    this.model = {
      tableId: 59,
      recordId: 0,
      userId: this._auth.getUserId(),
      roleId: Number(this.role),
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add expense");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة مصروف");
    }
    
    this.openEntry2(this.model);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.paymenttocompanyservice.getPaymentToCompanyEntry(id).subscribe((result: PaymentToCompanyModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number, recordSt?: number) => {
    if(this.opC == true) {
    if (recordSt != 3) {
      this.model = {
        tableId: 59,
        recordId: id,
        userId: this._auth.getUserId(),
        roleId: Number(this.role),
        languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
      };
      if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit expense");
        localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Edit");
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل مصروف");
        localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Edit");
      }
      
      this.openEntry2(this.model)
    }
  }else {
    this._ui.loadingStateChanged.next(false);
    this.opC = true
  }
  }

  onDelete(idAC:number) { 
    this.opC = false
    this.deleteModel = {
      name: this.pTableName,
      id: idAC
    }
    this.openConfirmDialog(this.deleteModel)
    
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        (this.selection.clear() ,this.clickedRows.clear()):
        (this.selection.clear(), this.dataSource.data.forEach((row:any) => {this.selection.select(row); if (!this.clickedRows.has(row)) {

          this.clickedRows.add(row)
        }}))
  }

  onId(id: number, row:PaymentToCompanyModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }


  openEntry  (result: PaymentToCompanyModel) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(PaymentfromEntryComponent, {
        disableClose: true,
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(PaymentfromEntryComponent, {
        disableClose: false,
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

  openEntry2  (result: Send) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(PaymentfromEntryComponent, {
        disableClose: true,
        
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(PaymentfromEntryComponent, {
        disableClose: true,
        
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

  openConfirmDialog (result: DeleteModel) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(CheckfordeleteComponent, {
        disableClose: true,
        
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(CheckfordeleteComponent, {
        disableClose: true,
        
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  }

}
