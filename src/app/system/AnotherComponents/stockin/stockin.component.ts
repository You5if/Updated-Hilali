import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { StockInEntryComponent } from './stockin-entry/stockin-entry.component';
import { StockInModel } from './stockin.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { StockInService } from './stockin.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';
import { SelectionModel } from '@angular/cdk/collections';
import { Title } from '@angular/platform-browser';
import { Direction } from '@angular/cdk/bidi';


@Component({
    selector: 'app-stockin',
    templateUrl: './stockin.component.html',
    styleUrls: ['./stockin.component.scss']
  })

export class StockInComponent implements OnInit {

  idS !: number;
  workShimmerBtn: boolean;
  workShimmerTable: boolean;
  workShimmerCard: boolean;
  workShimmerPaginator: boolean;
  workShimmerHeader:boolean;
  workShimmerCardBtn: boolean;
  direction!: Direction;
  headerToShow: any[] = []
  customerCode!: string;
  customerName!: string;
  customerMobile!: string;
  balance!: string;
  edit!: string;
  header!: string;
  submit!: string;
  cancel!: string;
  selection = new SelectionModel<StockInModel>(true, []);;

  stockInDate!: string;
  stockInCode!: string;
  description!: string;
  indexes!: any[]

  model!: Send;
    displayedColumns: string[] =
        [ 'StockInCode','StockInDate', 'warehouse'];

    dataSource: any;
    warehouse!:string;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;

    totalRecords!: number;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    clickedRows = new Set<StockInModel>();

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
        private _globals: AppGlobals,
        private _msg: MessageBoxService,
        private _auth: AuthService,
        private _select: SelectService,
        private stockinservice: StockInService,
        private titleService: Title,


      ) {
        this.pTableName = 'StockIn';
        this.pScreenId = 38;
        this.pTableId = 38;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
    this.titleService.setTitle("Stock in - Elhelali");
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
      this.header = "Stock in"
      this.stockInDate = "Stock in date"
      this.stockInCode = "Stock in code"
      this.description = "Description"
      this.warehouse = "Warehouse"
      
      this.edit = "Edit"
      this.submit = "Submit"
      this.cancel = "Cancel"
      this.headerToShow = [this.stockInCode, this.stockInDate,this.warehouse]

    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "المخزون الداخل"
      this.stockInDate = "التاريخ"
      this.stockInCode = "الرمز"
      this.description = "الوصف"
      this.warehouse = "المخزن"
      this.edit = "تعديل"
      this.submit = "ارسال"
      this.cancel = "الغاء"
      this.headerToShow = [this.stockInCode, this.stockInDate,this.warehouse]

    }
    this._cf.getPageData('StockIn', this.pScreenId, this._auth.getUserId(), this.pTableId,
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

  onSort   () {
    const dialogRef = this.dialog.open(PageSortComponent, {
      disableClose: true,
      data: this.pTableId
    });
  };

  onAdd   () {
    this.model = {
      tableId: 38,
      recordId: 0,
      userId: 26,
      roleId: 2,
      languageId:  Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
        if (localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add stock in");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة مخزون");
    }
    
    this.openEntry2(this.model);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.stockinservice.getStockInEntry(id).subscribe((result: StockInModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    this.model = {
      tableId: 38,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId:  Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
        if (localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit stock in");
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Edit");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل مخزون");
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Edit");
    }
    
    this.openEntry2(this.model)
  }

  onDelete = function(id: number) {
      
  };
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

  onId(id: number, row:StockInModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }

  openEntry   (result: StockInModel) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(StockInEntryComponent, {
        disableClose: true,
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(StockInEntryComponent, {
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
      const dialogRef = this.dialog.open(StockInEntryComponent, {
        disableClose: true,
       
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(StockInEntryComponent, {
        disableClose: true,
       
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

}
