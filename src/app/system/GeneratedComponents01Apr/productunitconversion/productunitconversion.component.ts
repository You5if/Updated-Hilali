import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { ProductUnitConversionEntryComponent } from './productunitconversion-entry/productunitconversion-entry.component';
import { ProductUnitConversionModel } from './productunitconversion.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { ProductUnitConversionService } from './productunitconversion.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';
import { SelectionModel } from '@angular/cdk/collections';
import { Title } from '@angular/platform-browser';
import { Direction } from '@angular/cdk/bidi';



@Component({
    selector: 'app-productunitconversion',
    templateUrl: './productunitconversion.component.html',
    styleUrls: ['./productunitconversion.component.scss']
  })

export class ProductUnitConversionComponent implements OnInit {

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
  selection = new SelectionModel<ProductUnitConversionModel>(true, []);;

  productFromUnitId!:string;
  productToUnitId!:string;
  quantity!:string;
  description!:string;
  
  model!: Send;
  
  indexes!: any[];
    displayedColumns: string[] =
        ['ProductFromUnitId','Quantity', 'ProductToUnitId'];

    dataSource: any;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;

    totalRecords!: number;
    clickedRows = new Set<ProductUnitConversionModel>();
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
        private _msg: MessageBoxService,
        private _auth: AuthService,
        private _select: SelectService,
        private productunitconversionservice: ProductUnitConversionService,
        private titleService: Title,


      ) {
        this.pTableName = 'ProductUnitConversion';
        this.pScreenId = 30;
        this.pTableId = 30;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
    this.titleService.setTitle("Item unit conversion - Elhelali");
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
      this.header = "Item unit conversion"
      this.productFromUnitId = "From unit"
      this.productToUnitId = "To unit"
      this.quantity = "Quantity"
      this.description = "Description"
      this.edit = "Edit"
      this.submit = "Submit"
      this.cancel = "Cancel"
      this.headerToShow = [this.productFromUnitId, this.quantity,this.productToUnitId]

    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "تحويل وحدة المنتجات"
     
      this.productFromUnitId = "من وحدة"
      this.productToUnitId = "الى وحدة"
      this.quantity = "الكمية"
      this.description = "الوصف"
      this.edit = "تعديل"
      this.submit = "ارسال"
      this.cancel = "الغاء"
      this.headerToShow = [this.productFromUnitId, this.quantity,this.productToUnitId]
    }
    this._cf.getPageData('ProductUnitConversion', this.pScreenId, this._auth.getUserId(), this.pTableId,
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
      tableId: 30,
      recordId: 0,
      userId: 26,
      roleId: 2,
       languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if (localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add conversion");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة تحويلة");
    }
    
    this.openEntry2(this.model);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.productunitconversionservice.getProductUnitConversionEntry(id).subscribe((result: ProductUnitConversionModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    this.model = {
      tableId: 30,
      recordId: id,
      userId: 26,
      roleId: 2,
       languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if (localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit conversion");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل تحويلة");
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

  onId(id: number, row:ProductUnitConversionModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }

  openEntry   (result: ProductUnitConversionModel) {
    if (result === undefined) {
       const dialogRef = this.dialog.open(ProductUnitConversionEntryComponent, {
        disableClose: true,
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
       const dialogRef = this.dialog.open(ProductUnitConversionEntryComponent, {
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
       const dialogRef = this.dialog.open(ProductUnitConversionEntryComponent, {
        disableClose: true,
        
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
       const dialogRef = this.dialog.open(ProductUnitConversionEntryComponent, {
        disableClose: true,
        
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

}
