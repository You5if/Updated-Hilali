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
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

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
  invoiceId!:number;
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
    this.titleService.setTitle("Sales reports - Elhelali");
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.header1 = "Customer reports"
      this.header2 = "Invoice reports"
      this.customer = "Customer"
      this.balanceSummary = "Balance summary"
      this.invoice = "Invoice"
      this.fetchDetails = "Fetch details"
      this.fullProfile = "Full profile"
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header1 = "تقارير العملاء"
      this.header2 = "تقارير الفواتير"
      this.customer = "العميل"
      this.invoice = "الفاتورة"
      this.fetchDetails = "جلب التفاصيل"
      this.balanceSummary = "ملخص الحساب"
      this.fullProfile = "ملف العميل الكامل"
    }
    this._select.getDropdown("customerid", "customer", "customername", "active=1 and deleted=0 and customerid>1", false).subscribe((res: SelectModel[]) => {
      this.customers = res
      
    });
    this._select.getDropdown("invoiceid", "invoice", "invoiceno", "active=1 and deleted=0 and invoiceid>1", false).subscribe((res: SelectModel[]) => {
      this.invoices = res
      
    });
  }

  onBalance() { 
    const reportId:number = 10
    
    
    let restOfUrl: string; 
    restOfUrl = 'customerid=' + this.customerId; 
    console.log(restOfUrl)
    this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl }); 
    //this._nav.onClickListItem('FRP');
    this.router.navigate(['/System/ReportsPage']);
  }
  onFetch() { 
    const reportId:number = 13
    
    
    let restOfUrl: string; 
    restOfUrl = 'invoiceid=' + this.invoiceId; 
    console.log(restOfUrl)
    this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl }); 
    //this._nav.onClickListItem('FRP');
    this.router.navigate(['/System/ReportsPage']);
  }
  onProfile() { 
    const reportId:number = 8
    
    
    let restOfUrl: string; 
    restOfUrl = 'customerid=' + this.customerId; 
    console.log(restOfUrl)
    this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl }); 
    //this._nav.onClickListItem('FRP');
    this.router.navigate(['/System/ReportsPage']);
  }

  onChangeCustomer(id: number) {
    this.disabled = false
    this.customerId = id
  }
  onChangeInvoice(id: number) {
    this.disabled2 = false
    this.invoiceId = id
  }
  

}
