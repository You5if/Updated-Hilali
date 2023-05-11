import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { JournalEntryEntryComponent } from './journalentry-entry/journalentry-entry.component';
import { JournalEntryModel } from './journalentry.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { Router, RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { JournalEntryService } from './journalentry.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { formatDate } from '@angular/common';
import { AppGlobals } from 'src/app/app.global';
import { SelectionModel } from '@angular/cdk/collections';
import { Title } from '@angular/platform-browser';
import { SystemNavigationComponent } from '../system-navigation/system-navigation.component';
import { ReportPageService } from 'src/app/components/PR/report-page/report-page.service';

import { CheckforstateComponent } from './operation/statecheck/checkfordelete.component';
import { Direction } from '@angular/cdk/bidi';
import { MySortComponent } from '../AnotherComponents/invoice/operation/my-sort/my-sort.component';
import { MyFilterComponent } from '../AnotherComponents/invoice/operation/my-filter/my-filter.component';

@Component({
  selector: 'app-journalentry',
  templateUrl: './journalentry.component.html',
  styleUrls: ['./journalentry.component.scss']
})

export class JournalEntryComponent implements OnInit {

  workShimmerBtn: boolean;
  workShimmerTable: boolean;
  workShimmerCard: boolean;
  workShimmerPaginator: boolean;
  workShimmerHeader:boolean;
  workShimmerCardBtn: boolean;
  direction!: Direction;
  headerToShow: any[] = []
  indexes!: any[]
  entryDate!: string;
  debitacc!: string;
  creditacc!: string;
  currency!: string;
  selection = new SelectionModel<JournalEntryModel>(true, []);;
  amount!: string;
  edit!: string;
  header!: string;
  opC: boolean = true

  displayedColumns: string[] =
    [ 'code', 'EntryDate', 'amount', 'currency', 'report'];

  dataSource: any;
  isLastPage = false;
  pTableName: string;
  pScreenId: number;
  code!: string
  pTableId: number;
  state!: string
  recordsPerPage: number;
  currentPageIndex: number;
  ref!: string
  menuId: number;


  pageData: any
  report!: string
  clickedRows = new Set<JournalEntryModel>();

  totalRecords!: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;


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
    public _nav: SystemNavigationComponent,
    private router: Router,
    private _ui: UIService,
    private _msg: MessageBoxService,
    private _globals: AppGlobals,
    private _auth: AuthService,
    private _select: SelectService,
    private journalentryservice: JournalEntryService,
    private titleService: Title,
  ) {
    this.pTableName = 'JournalEntry';
    this.pScreenId = 15;
    this.pTableId = 15;
    this.recordsPerPage = 10;
    this.currentPageIndex = 1;
    this.menuId = 1019106011;
    this.titleService.setTitle("Journals - Elhelali");
  }

  ngOnInit() {
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
    this.workShimmerBtn = true
    this.workShimmerHeader = true
    this.workShimmerTable = true
    this.workShimmerCard = true
    this.workShimmerCardBtn = true
    this.workShimmerPaginator = true
    if (localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.entryDate = "Date"
      this.debitacc = "Acc."
      this.creditacc = "Credit"
      this.report = "Report"
      this.code = "Code"
      this.state = "State"
      this.amount = "Amount"
      this.currency = "Currency"
      this.ref = " Reference"
      this.edit = "Edit"
      this.header = "Journals"
      this.headerToShow = [this.code, this.entryDate,this.amount, this.currency, this.report]

    } else if (localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.entryDate = "التاريخ"
      this.debitacc = "الحسابات"
      this.creditacc = "التامينات"
      this.state = "الحالة"
      this.ref = "المرجع"
      this.report = "التقرير"
      this.code = "الرمز"
      this.amount = "المبلغ"
      this.currency = "العملة"
      this.edit = "تعديل"
      this.header = "السجلات"
      this.headerToShow = [this.code, this.entryDate,this.amount, this.currency, this.report]

    }

    this.pageData.sort = this._cf.sortVar
    this.pageData.filter = this._cf.filterVar

    // this._ui.loadingStateChanged.next(true);
    this._cf.newGetPageData(this.pTableName, this.pageData).subscribe((result) => {
      // this._ui.loadingStateChanged.next(false);
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
      console.log(result)
    })
    // this._cf.getPageData('JournalEntry', this.pScreenId, this._auth.getUserId(), this.pTableId,
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
  onMySort() {

    const dialogRef = this.dialog.open(MySortComponent, {
      disableClose: true,
      data: {
        tableId: 15,
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

  onMyFilter() {

    const dialogRef = this.dialog.open(MyFilterComponent, {
      disableClose: true,
      data: {
        tableId: 15,
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

  onState(id: number, status: any, rState: number) {

    if (rState != 2203) {
      let stateModel = {
        statusId: id
      }
      // this._ui.loadingStateChanged.next(true);
      this.opC = false
      this.openState(stateModel);
      // this._ui.loadingStateChanged.next(false);
    }

  };

  openState(result: any) {
    const dialogRef = this.dialog.open(CheckforstateComponent, {
      disableClose: true,

      data: result
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

  onReport(jourId: number) {
    this.opC = false
    var reportId: number
    reportId = 8
    // if (report == "Expense") {
    //    reportId = 3; // if expense button: 3, Revenue: 4, RevVsExp: 5 
    // }else if (report == "Revenue") {
    //  reportId = 4; // if expense button: 3, Revenue: 4, RevVsExp: 5 
    // }else if (report == "Rev vs. Exp") {
    //   reportId = 5; // if expense button: 3, Revenue: 4, RevVsExp: 5 
    // }

    let restOfUrl: string;
    restOfUrl = 'journalid=' + jourId;

    console.log(restOfUrl)
    this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl });
    // this.router.navigate(['System/Reports']);
    this.router.navigate(['/System/ReportsPage']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  paginatoryOperation(event: PageEvent) {
    this.workShimmerTable = true
    this.workShimmerCard = true
    this.workShimmerCardBtn = true
    try {
      this.pageData.sort = this._cf.sortVar
      this.pageData.filter = this._cf.filterVar
      this.pageData.recordsPerPage = event.pageSize
      this._cf.newGetPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
        this.pTableId, this.totalRecords,
        this.pageData.sort,
        this.pageData.filter).subscribe(
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
      // this._cf.getPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
      //   this.pTableId, this.totalRecords).subscribe(
      //     (result: JournalEntryModel) => {
            // this._ui.loadingStateChanged.next(false);
      //       this.totalRecords = result[0].totalRecords;
      //       this.recordsPerPage = event.pageSize;
      //       this.dataSource = result;
      //     }, error => {
            // this._ui.loadingStateChanged.next(false);
      //       this._msg.showAPIError(error);
      //       return false;
      //     });
    } catch (error: any) {
      // this._ui.loadingStateChanged.next(false);
      this._msg.showAPIError(error);
      return false;
    }
  }

  onSort() {
    const dialogRef = this.dialog.open(PageSortComponent, {
      disableClose: true,
      data: this.pTableId
    });
  };

  onAdd() {
    const result: JournalEntryModel = {
      'journalEntryId': 0,
      'entryName': '',
      'currency': 17001,
      'reference': '',
      'sysCompanyId': 1,
      'description': '',
      'auditColumns': this._auth.getAuditColumns(),
      'entryMode': 'A',
      'forexRate': '0.00',
      journalEntryDetailEntry: [],
      'active': true,
      'readOnly': false,
      'entryDate': formatDate(new Date(), 'yyyy-MM-dd', 'en_US')
    };
    localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add");
    if (localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add journal");
    } else if (localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة سجل");
    }
    this.openEntry(result);
  };

  onView = (id: number) => {
    // this._ui.loadingStateChanged.next(true);
    this.journalentryservice.getJournalEntryEntry(id).subscribe((result: JournalEntryModel) => {
      // this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number, rState: number) => {
    if (rState != 2203) {
      if (this.opC == true) {
        // this._ui.loadingStateChanged.next(true);
        this.journalentryservice.getJournalEntryEntry(id).subscribe((result: JournalEntryModel) => {
          // this._ui.loadingStateChanged.next(false);
          result.entryMode = 'E';
          result.readOnly = false;
          if (localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
            localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit journal");
          } else if (localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
            localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل سجل");
          }
          this.openEntry(result);
        });
      } else {
        // this._ui.loadingStateChanged.next(false);
        this.opC = true
      }
    } else {
      console.log('user');

    }
  }

  onDelete = function (id: number) {

  };

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      (this.selection.clear(), this.clickedRows.clear()) :
      (this.selection.clear(), this.dataSource.data.forEach((row: any) => {
        this.selection.select(row); if (!this.clickedRows.has(row)) {

          this.clickedRows.add(row)
        }
      }))
  }

  onId(id: number, row: JournalEntryModel) {

    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    } else {
      this.clickedRows.add(row)
    }

  }

  openEntry(result: JournalEntryModel) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(JournalEntryEntryComponent, {
        disableClose: true,
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(JournalEntryEntryComponent, {
        disableClose: true,
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

}
