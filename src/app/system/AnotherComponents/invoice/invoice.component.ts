import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { InvoiceEntryComponent } from './invoice-entry/invoice-entry.component';
import { DeleteModel, InvoiceModel } from './invoice.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { InvoiceService } from './invoice.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { AppGlobals } from 'src/app/app.global';
import { Send } from 'src/app/send.model';
import { SelectionModel } from '@angular/cdk/collections';
import { SystemNavigationComponent } from '../../system-navigation/system-navigation.component';
import { ReportPageService } from 'src/app/components/PR/report-page/report-page.service';
import { MySortComponent } from './operation/my-sort/my-sort.component';
import { MyFilterComponent } from './operation/my-filter/my-filter.component';
import { CheckfordeleteComponent } from './operation/checkfordelete/checkfordelete.component';
import { FilterService } from 'src/app/components/filter/filter.service';
import { AlertifyService } from 'src/app/alertify.service';
import { Title } from '@angular/platform-browser';
import { Direction } from '@angular/cdk/bidi';


@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss']
  })

export class InvoiceComponent implements OnInit {

  idS! : number;
  direction!: Direction;
  customerCode!: string;
  customerName!: string;
  customerMobile!: string;
  balance!: string;
  invoiceNo!: string;
  invoiceDate!: string;
  customer!:string;
  warehouse!:string;
  edit!: string;
  header!: string;
  submit!: string;
  cancel!: string;
  selection = new SelectionModel<InvoiceModel>(true, []);;

  opC: boolean = true

  pageData :any

  deleteModel!: DeleteModel

  model!: Send;
    displayedColumns: string[] =
        ['select','InvoiceNo', 'InvoiceDate','customer', 'warehouse', 'report', 'delete'];

    dataSource: any;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;
    indexes!: any[]
    report!:string;
    delete!: string;

    role = localStorage.getItem("role");
    sortV!:string

    filterV!: string

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    totalRecords!: number;
    clickedRows = new Set<InvoiceModel>();
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
        private _report: ReportPageService,
        private _ui: UIService,
        private _globals: AppGlobals,
        private _msg: MessageBoxService,
        private alertify: AlertifyService,
        public _nav: SystemNavigationComponent,
        private _auth: AuthService,
        private _select: SelectService,
        private invoiceservice: InvoiceService,
        private titleService: Title,


        
      ) {
        this.pTableName = 'Invoice';
        this.pScreenId = 46;
        this.pTableId = 46;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
    this.titleService.setTitle("Invoice - Elhelali");
    this.pageData = {
      tableId: this.pTableId,
      userId: 26,
      recordsPerPage: 10,
      pageNo: 1,
      sort: '',
      filter: ""
    }
    this._cf.setSort("")
    this._cf.setFilter("")
      this.refreshMe();
  }

  refreshMe() {
    
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.header = "Invoice"
      this.invoiceNo = "Invoice No."
      this.invoiceDate = "Invoice Date"
      this.customer = "Customer"
      this.warehouse = "Warehouse"
      this.edit = "Edit"
      this.report = "Report"
      this.delete = "Delete"
      
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "الفواتير"
      this.invoiceNo = "الفاتورة"
      this.invoiceDate = "التاريخ"
      this.customer = "العميل"
      this.warehouse = "المخزن"
      this.delete = "حذف"
    //   this.nameT = "الاسم"
    //  this.amount = "المبلغ"
    //  this.statusT = "الحالة"
      this.edit = "تعديل"
      this.report = "تقرير "
      
    }

    
    this.pageData.sort = this._cf.sortVar
    this.pageData.filter = this._cf.filterVar

    this._ui.loadingStateChanged.next(true);
    this._cf.newGetPageData(this.pTableName, this.pageData).subscribe((result) => {
      this._ui.loadingStateChanged.next(false);
      this.totalRecords = result[0].totalRecords;
          this.recordsPerPage = this.recordsPerPage;
          this.dataSource = new MatTableDataSource(result);
          this.indexes = result
    })
    // this._cf.getPageData('Invoice', this.pScreenId, this._auth.getUserId(), this.pTableId,
    //   this.recordsPerPage, this.currentPageIndex, false).subscribe(
    //     (result) => {
    //       this.totalRecords = result[0].totalRecords;
    //       this.recordsPerPage = this.recordsPerPage;
    //       this.dataSource = new MatTableDataSource(result);
    //       this.indexes = result
    //     }
    //   );

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

  // onMySort = function() {
  //   this.dialog = this.dialog.open(MySortComponent, {
  //     disableClose: true,
  //     data: {}
  //   });
  // }
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
  onMySort   () {
    
      const dialogRef = this.dialog.open(MySortComponent, {
        disableClose: true,
        data: {
          tableId: 46,
          recordId: 0,
          userId: 26,
          roleId: 2,
          languageId:  Number(localStorage.getItem(this._globals.baseAppName + '_language'))
        }
      });
    
    dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
    this.paginator.firstPage()
  }
  
  onMyFilter   () {

      const dialogRef = this.dialog.open(MyFilterComponent, {
        disableClose: true,
        data: {
          tableId: 46,
          recordId: 0,
          userId: 26,
          roleId: 2,
          languageId:  Number(localStorage.getItem(this._globals.baseAppName + '_language'))
        }
      });
    
    dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
    this.paginator.firstPage()
  }
  onReport(invId:number) { 
    this.opC = false
    var reportId: number
    reportId = 6
    // if (report == "Expense") {
    //    reportId = 3; // if expense button: 3, Revenue: 4, RevVsExp: 5 
    // }else if (report == "Revenue") {
    //  reportId = 4; // if expense button: 3, Revenue: 4, RevVsExp: 5 
    // }else if (report == "Rev vs. Exp") {
    //   reportId = 5; // if expense button: 3, Revenue: 4, RevVsExp: 5 
    // }
    
    let restOfUrl: string; 
    restOfUrl = 'invoiceid=' + invId; 
     
    console.log(restOfUrl)
    this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl }); 
    //this._nav.onClickListItem('FRP');
  }

  onDelete(idAC:number) { 
    if (this.role != '10') {
    this.opC = false
    this.deleteModel = {
      name: this.pTableName,
      id: idAC
    }
    this.openConfirmDialog(this.deleteModel)
    // this._ui.loadingStateChanged.next(true);
    // this.invoiceservice.getDelete(id).subscribe((result) => {
    //   this._ui.loadingStateChanged.next(false);
    //   this.refreshMe();
    // })
  }else {
    this.alertify.error("Not allowed to do such action")
  }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  paginatoryOperation(event: PageEvent) {
    try {
      this.pageData.sort = this._cf.sortVar
    this.pageData.filter = this._cf.filterVar
      this.pageData.recordsPerPage = event.pageSize
      this._cf.newGetPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
        this.pTableId, this.totalRecords, 
        this.pageData.sort, 
        this.pageData.filter).subscribe(
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
      // this._cf.getPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
      //   this.pTableId, this.totalRecords).subscribe(
      //     (result: InvoiceModel) => {
      //       this._ui.loadingStateChanged.next(false);
      //       this.totalRecords = result[0].totalRecords;
      //       this.recordsPerPage = event.pageSize;
      //       this.dataSource = result;
      //     }, error => {
      //       this._ui.loadingStateChanged.next(false);
      //       this._msg.showAPIError(error);
      //       return false;
      //     });
    } catch (error:any) {
      this._ui.loadingStateChanged.next(false);
      this._msg.showAPIError(error);
      return false;
    }
  }

  onSort   () {
    const dialogRef = this.dialog.open(PageSortComponent, {
      disableClose: true,
      data: this.pTableId
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

  onAdd   () {
    this.model = {
      tableId: 46,
      recordId: 0,
      userId: 26,
      roleId: 2,
      languageId:  Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add invoice");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة فاتورة");
    }
    
    this.openEntry2(this.model);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.invoiceservice.getInvoiceEntry(id).subscribe((result: InvoiceModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    if (this.role != '10') {
      if(this.opC == true) {
        this.model = {
          tableId: 46,
          recordId: id,
          userId: 26,
          roleId: 2,
          languageId:  Number(localStorage.getItem(this._globals.baseAppName + '_language'))
        };
        if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
          localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit invoice");
          localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Edit");
        }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
          localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل فاتورة");
          localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Edit");
        }
        
        this.openEntry2(this.model)
      }else {
        this._ui.loadingStateChanged.next(false);
        this.opC = true
      }
    }else {
      this.alertify.error("Not allowed to do such action")
    }
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

  onId(id: number, row:InvoiceModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }
  openEntry   (result: InvoiceModel) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(InvoiceEntryComponent, {
        disableClose: true,
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(InvoiceEntryComponent, {
        disableClose: false,
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };
  openEntry2   (result: Send) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(InvoiceEntryComponent, {
        disableClose: true,
        
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(InvoiceEntryComponent, {
        disableClose: true,
        
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

  openConfirmDialog  (result: DeleteModel) {
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
