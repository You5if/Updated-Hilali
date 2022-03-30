import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// import { AuthService } from 'angular4-social-login';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { SelectService } from 'src/app/components/common/select.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { ReportPageService } from 'src/app/components/PR/report-page/report-page.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { AccountService } from '../../account/account.service';
import { SystemNavigationComponent } from '../../system-navigation/system-navigation.component';
import { Title } from '@angular/platform-browser';
import { Direction } from '@angular/cdk/bidi';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  header1!:string
  header2!:string
  disabled: boolean = true
  disabled2: boolean = true
  direction!:Direction
  balanceSummary!:string
  fetchDetails!:string
  fullProfile!:string
  customer!:string
  customerId!:number;
  customers!: SelectModel[]
  invoice!:string
  productId!:number;
  invoices!: SelectModel[]
  constructor(
    public dialog: MatDialog,
        private _report: ReportPageService,
        private _cf: CommonService,
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _globals: AppGlobals,
        // private _auth: AuthService,
        private _select: SelectService,
        private accountservice: AccountService,
        public _nav: SystemNavigationComponent,
        private router: Router,
        private titleService: Title,


  ) { }

  ngOnInit() {
    this.titleService.setTitle("Inventory reports - Elhelali");
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.header1 = "Stock reports"
      this.header2 = "Products reports"
      this.customer = "Customer"
      this.balanceSummary = "Stock report"
      this.invoice = "Product"
      this.fetchDetails = "Fetch profile"
      this.fullProfile = "Full profile"
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header1 = "تقارير المخزون"
      this.header2 = "تقارير المنتجات"
      this.customer = "العميل"
      this.invoice = "المنتج"
      this.fetchDetails = "جلب التفاصيل"
      this.balanceSummary = "تقرير المخزون"
      this.fullProfile = "ملف العميل الكامل"
    }
    
    this._select.getDropdown("productid", "product", "productname", "active=1 and deleted=0 and productid>1", false).subscribe((res: SelectModel[]) => {
      this.invoices = res
      
    });
  }

  onStock() { 
    const reportId:number = 15
  
    this._report.passReportData({ reportId: reportId}); 
    this._nav.onClickListItem('FRP');
  }
  onFetch() { 
    const reportId:number = 14
    
    
    let restOfUrl: string; 
    restOfUrl = 'productid=' + this.productId; 
    console.log(restOfUrl)
    this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl }); 
    this._nav.onClickListItem('FRP');
  }
  // onProfile() { 
  //   const reportId:number = 14
    
    
  //   let restOfUrl: string; 
  //   restOfUrl = 'productid=' + this.customerId; 
  //   console.log(restOfUrl)
  //   this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl }); 
  //   this._nav.onClickListItem('FRP');
  // }

  onChangeCustomer(id: number) {
    this.disabled = false
    this.customerId = id
  }
  onChangeInvoice(id: number) {
    this.disabled2 = false
    this.productId = id
  }

}
