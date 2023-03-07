import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import {SelectionModel} from '@angular/cdk/collections';

import { TaxModel } from './tax.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { TaxService } from './tax.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { SystemTaxComponent } from './system-tax/system-tax.component';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';
import { Direction } from '@angular/cdk/bidi';

@Component({
    selector: 'app-tax',
    templateUrl: './tax.component.html',
    styleUrls: ['./tax.component.scss']
  })

export class TaxComponent implements OnInit {

  indexes!: any[]

    displayedColumns: string[] =
        ['TaxName', 'TaxAmount'];

    dataSource: any;
    isLastPage = false;
    model!: Send;
    selection = new SelectionModel<TaxModel>(true, []);;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;
    workShimmerBtn: boolean;
  workShimmerTable: boolean;
  workShimmerCard: boolean;
  workShimmerPaginator: boolean;
  workShimmerHeader:boolean;
  workShimmerCardBtn: boolean;
  direction!: Direction;
  headerToShow: any[] = []
    nameT!: string;
    amount!: string;
    statusT!: string;
    edit!: string;
    header!: string;


    totalRecords!: number;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    clickedRows = new Set<TaxModel>();
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
        private _auth: AuthService,
        private _globals: AppGlobals,
        private _select: SelectService,
        private taxservice: TaxService
      ) {
        this.pTableName = 'Tax';
        this.pScreenId = 11;
        this.pTableId = 11;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
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
      this.header = "Taxes"
     this.nameT = "Name"
     this.amount = "Amount"
     this.statusT = "Status"
      this.edit = "Edit"
      this.headerToShow = [this.nameT, this.amount]

      
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "الضرائب"
      this.nameT = "الاسم"
     this.amount = "المبلغ"
     this.statusT = "الحالة"
      this.edit = "تعديل"
      this.headerToShow = [this.nameT, this.amount]
    }
    this._cf.getPageData('Tax', this.pScreenId, this._auth.getUserId(), this.pTableId,
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
      tableId: 11,
      recordId: 0,
      userId: 26,
      roleId: 2,
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add");
        if (localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add tax");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة ضريبة");
    }
    this.openEntry2(this.model);
  };

  onView = (id: number) => {
    // this.model = {
    //   tableId: 11,
    //   recordId: id,
    //   userId: 26,
    //   roleId: 2,
    //   languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    // };
    // this.openEntry2(this.model)
  }

  onEdit = (id: number) => {
    this.model = {
      tableId: 11,
      recordId: id,
      userId: 26,
      roleId: 2,
       languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if (localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit tax");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل ضريبة");
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

  onId(id: number, row:TaxModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }

  openEntry   (result: TaxModel) {
    if (result === undefined) {
       const dialogRef = this.dialog.open(SystemTaxComponent, {
        disableClose: true,
        maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'custom-dialog',
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
       this.refreshMe();
     });
    } else {
       const dialogRef = this.dialog.open(SystemTaxComponent, {
        disableClose: true,
        maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'custom-dialog',
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
       this.refreshMe();
     });
    }
  };

  openEntry2   (result: Send) {
    if (result === undefined) {
       const dialogRef = this.dialog.open(SystemTaxComponent, {
        disableClose: true,
        width: "300px",
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
       const dialogRef = this.dialog.open(SystemTaxComponent, {
        disableClose: true,
        width: "300px",
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

}
