import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { ChequeFromCompanyEntryComponent } from './chequetocompany-entry/chequetocompany-entry.component';
import { ChequeToCompanyModel } from './chequetocompany.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { ChequeToCompanyService } from './chequetocompany.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { SelectionModel } from '@angular/cdk/collections';
import { AppGlobals } from 'src/app/app.global';

import { Movetobank2Component } from './movetobank/movetobank.component';
import { Checkforpass2Component } from './checkforpass/checkforpass.component';

import { Direction } from '@angular/cdk/bidi';
import { MySortComponent } from '../invoice/operation/my-sort/my-sort.component';
import { MyFilterComponent } from '../invoice/operation/my-filter/my-filter.component';

@Component({
    selector: 'app-chequeto2company',
    templateUrl: './chequetocompany.component.html',
    styleUrls: ['./chequetocompany.component.scss']
  })

export class ChequeFromCompanyComponent implements OnInit {

    displayedColumns: string[] = []

    dataSource: any;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;
    chequeNumber!:string;
    status!:string;
    dueDate!:string;
    passFail!: string
    amount!:string;
    currencyName!:string;
    customerName!:string;
    customerMobile1!:string;
    header!: string;
    direction! : Direction
    indexes!: any[]
    clickedRows = new Set<ChequeToCompanyModel>();
    selection = new SelectionModel<ChequeToCompanyModel>(true, []);workShimmerBtn: boolean;
workShimmerHeader: boolean;
workShimmerTable: boolean;
workShimmerCard: boolean;
workShimmerCardBtn: boolean;
workShimmerPaginator: boolean;
  headerToShow: any[] = [];
;

    role = localStorage.getItem("role");
    pageData: any
    @ViewChild(MatPaginator) paginator!: MatPaginator;

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
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _globals: AppGlobals,
        private _auth: AuthService,
        private _select: SelectService,
        private chequetocompanyservice: ChequeToCompanyService
      ) {
        this.pTableName = 'ChequeToCompany';
        this.pScreenId = 61;
        this.pTableId = 61;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {

    if (this.role == '5') {
      this.displayedColumns =['chequeNumber', 'amount', 'dueDate', 'passFail', 'status'];
    }else {
      this.displayedColumns =['chequeNumber', 'amount', 'dueDate', 'status'];
    }
    this.pageData = {
      tableId: this.pTableId,
      userId: 26,
      recordsPerPage: 10,
      pageNo: 1,
      sort: '',
      filter: ""
    }
      this.refreshMe();
  }

  refreshMe() {
        this.workShimmerBtn = true
    this.workShimmerHeader = true
    this.workShimmerTable = true
    this.workShimmerCard = true
    this.workShimmerCardBtn = true
    this.workShimmerPaginator = true
    if (localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.header = "Cheque from"
      this.chequeNumber = "Cheque"
      this.amount = "Amount"
      this.currencyName = "Currency"
      this.customerName = "Customer"
      this.customerMobile1 = "Contact"
      this.dueDate = "Due"
      this.passFail = "Pass/Fail"
      this.status = "Status"
      if (this.role == '5') {
        this.headerToShow =[this.chequeNumber, this.amount, this.dueDate, this.passFail, this.status];
      }else {
        this.headerToShow =[this.chequeNumber, this.amount, this.dueDate, this.status];
      }
      
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "الشيكات من"
      this.chequeNumber = "الشيك"
      this.amount = "المبلغ"
      this.currencyName = "العملة"
      this.customerName = "العميل"
      this.customerMobile1 = "الهاتف"
      this.dueDate = "تاريخ الاستحقاق"
      this.passFail = "نجاح/فشل"
      this.status = "الحالة"
      
      if (this.role == '5') {
        this.headerToShow =[this.chequeNumber, this.amount, this.dueDate, this.passFail, this.status];
      }else {
        this.headerToShow =[this.chequeNumber, this.amount, this.dueDate, this.status];
      }
    }
    this._cf.getPageData('ChequeFromCompany', this.pScreenId, this._auth.getUserId(), this.pTableId,
      this.recordsPerPage, this.currentPageIndex, false).subscribe(
        (result) => {
          this.workShimmerBtn = false
          this.workShimmerHeader = false
    this.workShimmerTable = false
    this.workShimmerCard = false
    this.workShimmerCardBtn = false
    this.workShimmerPaginator = false
          this.totalRecords = result[0].totalRecords;
          this.recordsPerPage = this.recordsPerPage;
          this.dataSource = new MatTableDataSource(result);
          this.indexes = result
          console.log(result);
          
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

  onMySort  () {
    
    const dialogRef = this.dialog.open(MySortComponent, {
      disableClose: true,
      data: {
        tableId: 61,
        recordId: 0,
        userId: 26,
        roleId: 2,
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
  // console.log(this.selection._selected);
  
    const dialogRef = this.dialog.open(MyFilterComponent, {
      disableClose: true,
      data: {
        tableId: 61,
        recordId: 0,
        userId: 26,
        roleId: 2,
        languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
      }
    });
  
  dialogRef.afterClosed().subscribe(() => {
    this.refreshMe();
  });
  this.paginator.firstPage()
}

// onMoveToBank () {
//   if (this.selection._selected != null && this.selection._selected !=  []) {
//     var arr = []
//     for (let i = 0; i < this.selection._selected.length; i++) {
      
//       if (this.selection._selected && !this.selection._selected[i].isMoved) {
//         arr.push(this.selection._selected[i])
//       }
      
//     }
//     const dialogRef = this.dialog.open(Movetobank2Component, {
//       disableClose: true,
//       data: {
//         selected: arr
//       }
//     });
  
//   dialogRef.afterClosed().subscribe(() => {
//     this.refreshMe();
//     this.selection.clear()
//   });
//   }

// }
checkPass  (id: number) {
  
    const dialogRef = this.dialog.open(Checkforpass2Component, {
      disableClose: true,
      data: {
        id: id,
        url: 'passcheque'
      }
    });
  
  dialogRef.afterClosed().subscribe(() => {
    this.refreshMe();
    this.selection.clear()
  });
  

}
checkFail(id: number) {
  
    const dialogRef = this.dialog.open(Checkforpass2Component, {
      disableClose: true,
      data: {
        id: id,
        url: 'failcheque'
      }
    });
  
  dialogRef.afterClosed().subscribe(() => {
    this.refreshMe();
    this.selection.clear()
  });
  

}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  paginatoryOperation(event: PageEvent) {
    this.workShimmerTable = true
    this.workShimmerCard = true
    this.workShimmerCardBtn = true
    try {
      this._cf.getPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
        this.pTableId, this.totalRecords).subscribe(
          (result: any) => {
            this.workShimmerTable = false
    this.workShimmerCard = false
    this.workShimmerCardBtn = false
            // this._ui.loadingStateChanged.next(false);
            this.totalRecords = result[0].totalRecords;
            this.recordsPerPage = event.pageSize;
            this.dataSource = result;
          }, error => {
            // this._ui.loadingStateChanged.next(false);
            this._msg.showAPIError(error);
            return false;
          });
    } catch (error:any) {
      // this._ui.loadingStateChanged.next(false);
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
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    var num = 0
    console.log(this.indexes.length);
    
    for (let i = 0; i < this.indexes.length; i++) {
        
        if (this.indexes && this.indexes[i].isMoved) {
         num ++
        }
        
      }
    if (num != this.indexes.length) {
      this.isAllSelected() ?
        (this.selection.clear() ,this.clickedRows.clear()):
        (this.selection.clear(), this.dataSource.data.forEach((row:any) => {this.selection.select(row); if (!this.clickedRows.has(row)) {

          this.clickedRows.add(row)
        }}))
    }
  }

  onId(id: number, row:ChequeToCompanyModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }

  // onAdd = function () {
  //   const result: ChequeToCompanyModel = {
      
  //     'chequeToCompanyId': 0,
  //     'chequeNumber': '',
  //     'chequeType': 0,
  //     'currency': 0,
  //     'amount': 0,
  //     'fromCheque': 0,
  //     'toCheque': 0,
  //     'bankListId': 0,
  //     'chequeName': '',
  //     'description': '',
  //     'companyBankBranchAccountId': 0,
  //     'dueDate': new Date(),
  //     'customerId': 0,
  //     'customerAccountId': 0,
  //     'paymentToCompanyId': 0,
  //     'auditColumns': null,
  //     'entryMode': 'A',
  //     'active': true,
  //     'readOnly': false
  //   };
  //   this.openEntry(result);
  // };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.chequetocompanyservice.getChequeToCompanyEntry(id).subscribe((result: ChequeToCompanyModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.chequetocompanyservice.getChequeToCompanyEntry(id).subscribe((result: ChequeToCompanyModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'E';
      result.readOnly = false;
      this.openEntry(result);
    });
  }

  onDelete = function(id: number) {
      
  };

  openEntry  (result: ChequeToCompanyModel) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(ChequeFromCompanyEntryComponent, {
        disableClose: true,
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(ChequeFromCompanyEntryComponent, {
        disableClose: false,
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

}
