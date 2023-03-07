import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { AccountConfigurationEntryComponent } from './accountconfiguration-entry/accountconfiguration-entry.component';
import { AccountConfigurationModel } from './accountconfiguration.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { AccountConfigurationService } from './accountconfiguration.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { AppGlobals } from 'src/app/app.global';
import { Send } from 'src/app/send.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Title } from '@angular/platform-browser';
import { Direction } from '@angular/cdk/bidi';



@Component({
    selector: 'app-accountconfiguration',
    templateUrl: './accountconfiguration.component.html',
    styleUrls: ['./accountconfiguration.component.scss']
  })

export class AccountConfigurationComponent implements OnInit {

  idS! : number;
  workShimmerBtn: boolean;
  workShimmerTable: boolean;
  workShimmerCard: boolean;
  workShimmerPaginator: boolean;
  workShimmerHeader:boolean;
  workShimmerCardBtn: boolean;
  direction!: Direction;
  headerToShow: any[] = []
  accountCode!: string;
  accountName!: string;
  accountType!: string;
  balance!: string;
  edit!: string;
  header!: string;
  submit!: string;
  cancel!: string;
  configurationName!: string;
  description!: string;
  accountId!: string;
  selection = new SelectionModel<AccountConfigurationModel>(true, []);;
  financeEntryType!: string;
  

  model!: Send;

  indexes!: any[];
    displayedColumns: string[] =
        ['ConfigurationName', 'Description', 'AccountId', 'FinanceEntry'];

    dataSource: any;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;
    

    totalRecords!: number;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    clickedRows = new Set<AccountConfigurationModel>();
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
        private _msg: MessageBoxService,
        private _auth: AuthService,
        private _select: SelectService,
        private accountconfigurationservice: AccountConfigurationService,
        private titleService: Title,


      ) {
        this.pTableName = 'AccountConfiguration';
        this.pScreenId = 26;
        this.pTableId = 26;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
    this.titleService.setTitle("Account configuration - Elhelali");
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
      this.header = "Account configuration"
      this.configurationName = "Config. Name"
      this.description = "Description"
      this.accountId = "Account"
      this.financeEntryType = "Finance entry type"
      this.edit = "Edit"
      this.submit = "Submit"
      this.cancel = "Cancel"
      this.headerToShow = [this.configurationName, this.description, this.accountId, this.financeEntryType]
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "اعداد الحسابات"
      this.configurationName = "اسم الاعدادات"
      this.description = "الوصف"
      this.accountId = "الحساب"
      this.financeEntryType = "نوع الادخال المالي"
      this.edit = "تعديل"
      this.submit = "ارسال"
      this.cancel = "الغاء"
      this.headerToShow = [this.configurationName, this.description, this.accountId, this.financeEntryType]

    }
    this._cf.getPageData('AccountConfiguration', this.pScreenId, this._auth.getUserId(), this.pTableId,
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
      tableId: 26,
      recordId: 0,
      userId: 26,
      roleId: 2,
       languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if (localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add configuration");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة اعدادات");
    }
    
    this.openEntry2(this.model);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.accountconfigurationservice.getAccountConfigurationEntry(id).subscribe((result: AccountConfigurationModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    this.model = {
      tableId: 26,
      recordId: id,
      userId: 26,
      roleId: 2,
       languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if (localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit configuration");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل اعدادات");
    }
    
    this.openEntry2(this.model)
  }

  onDelete  (id: number) {
      
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

  onId(id: number, row:AccountConfigurationModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }

  openEntry   (result: AccountConfigurationModel) {
    if (result === undefined) {
       const dialogRef = this.dialog.open(AccountConfigurationEntryComponent, {
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
       const dialogRef = this.dialog.open(AccountConfigurationEntryComponent, {
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
       const dialogRef = this.dialog.open(AccountConfigurationEntryComponent, {
        disableClose: true,
        
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
       const dialogRef = this.dialog.open(AccountConfigurationEntryComponent, {
        disableClose: true,
        
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

}
