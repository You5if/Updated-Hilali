import { Direction } from '@angular/cdk/bidi';
import { Component, OnInit } from '@angular/core';
import { StyleDirective } from '@angular/flex-layout';
import { matDrawerAnimations } from '@angular/material/sidenav';
import { ResizeEvent } from 'angular-resizable-element';
import { AppGlobals } from 'src/app/app.global';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { LoginModule } from 'src/app/components/security/auth/login/login.model';

@Component({
  selector: 'app-system-navigation',
  templateUrl: './system-navigation.component.html',
  styleUrls: ['./system-navigation.component.scss']
})
export class SystemNavigationComponent implements OnInit {

  showFiller = false;
  showButton: boolean = false;
  key!: number;
  lang: string = "Arabic";
  direction: Direction = "ltr";
  lang_LS: string = "16001";
  break: boolean = true;
  title = 'SystemHR1';
  home!: string;
  businessP!: string;
  profile!:string;
  journal!: string;
  expense!: string;
  purchase!: string;
  tax!: string;
  forex!: string;
  account!: string;
  paymentFromCompany!: string;
  paymentToCompany!: string;
  proExpense!: string;
  proInv!: string;
  proExpenseList!: string;
  invoice!: string;
  invoiceM!: string;
  bank!: string;
  bankBranch!: string;
  bankAccount!: string;
  cheque!: string;
  cheque2!: string;
  fym!:string;
  customer!: string;
  accountConfiguration!: string;
  accounting!: string;
  config!: string;
  supplier!: string;
  suppForex!:string
  sales!: string;
  inventory!: string;
  product!: string;
  productCategory!: string;
  productGroup!: string;
  productUnit!: string;
  productPricing!: string;
  productStock!: string;
  productUnitConversion!: string;
  warehouse!: string;
  stockIn!: string;
  stockMovement!: string;
  fiscalYear!: string;
  accountOpen!: string;
  StockOpen!: string;
  CustOpen!: string;
  SuppOpen!: string;
  logout!: string;
  change!: string;
  reports!: string
  financialReports!: string;
  salesReports!: string;
  purchaseReports!: string;
  inventoryReports!: string;
  resizeStyle: object = {};

  isOpen_YourVariable = true;
  

  navigation!: string;
  role = localStorage.getItem("role");
  

  model: LoginModule = {
    'username': 'milesh@markoncs.com',
    'password': '123456789',
    'loginType': 1
  }

  constructor(private _globals: AppGlobals,
    private _auth: AuthService,) { }
    


ngOnInit(): void {

  this.role = localStorage.getItem("role");
  console.log(this.role);
  

  this.resizeStyle = {
    "max-width": `30%`,
  };
  this.home = "Home"
      this.businessP = "Company profile"
      this.journal = "Journal"
      this.expense = "Expenses"
      this.bank = "Bank"
      this.profile = "Profile"
      this.invoice = "Invoice"
      this.invoiceM = "Invoice (cubic meter)"
      this.bankBranch = "Bank branch"
      this.proExpense = "Procurement expenses"
      this.proInv = "Purchase invoice"
      this.proExpenseList = "Procurement expense list"
      this.bankAccount = "Bank account"
      this.reports = "Reports"
      this.paymentFromCompany = "Payment to supplier"
      this.paymentToCompany = "Customer payment"
      this.accountConfiguration = "Account configuration"
      this.suppForex = "Purchase Forex"
      this.tax = "Tax"
      this.forex = "Forex"
      this.fym = "Financial year management"
      this.customer = "Customer"
      this.account = "Account"
      this.accounting = "Accounting"
      this.config = "Configurations"
      this.fiscalYear = "Fiscal year"
      this.accountOpen = "Account opening balance"
      this.StockOpen = "Stock opening"
      this.CustOpen = "Customer opening balance"
      this.SuppOpen = "Supplier opening balance"
      this.sales = "Sales"
      this.inventory = "Inventory"
      this.product = "Product"
      this.productCategory = "Product category"
      this.productGroup = "Product group"
      this.productUnit = "Product unit"
      this.productPricing = "Product pricing"
      this.productStock = "Product stock"
      this.productUnitConversion = "Product unit conversion"
      this.warehouse = "Warehouse"
      this.stockIn = "Stock in"
      this.supplier = "Supplier"
      this.purchase = "Purchase"
      this.stockMovement = "Stock movement"
      this.financialReports = "Financial reports"
      this.salesReports = "Sales reports"
      this.purchaseReports = "Purchase reports"
      this.inventoryReports = "Inventory reports"
      this.cheque = "Cheque to"
      this.cheque2 = "Cheque from"
      this.logout = "Logout"
      this.change = "Language:"
  if (localStorage.getItem(this._globals.baseAppName + '_nav') == "") {
    this.navigation = "Home"
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
    this.onClickListItem('H')
    
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Home") {
    this.key = 0
    this.navigation = "Home"
    this.onClickListItem('H')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "BusinessProfile") {
    this.key = 1
    this.navigation = "BusinessProfile"
    this.onClickListItem('BP')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "JournalEntry") {
    this.key = 2
    this.navigation = "JournalEntry"
    this.onClickListItem('J')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Expense") {
    this.key = 3
    this.navigation = "Expense"
    this.onClickListItem('E')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Tax") {
    this.key = 4
    this.navigation = "Tax"
    this.onClickListItem('T')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Forex") {
    this.key = 5
    this.navigation = "Forex"
    this.onClickListItem('F')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "ProExpense") {
    this.key = 5
    this.navigation = "ProExpense"
    this.onClickListItem('PEX')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "ProExpense") {
    this.key = 5
    this.navigation = "ProInv"
    this.onClickListItem('PIN')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "ProExpenseList") {
    this.key = 5
    this.navigation = "ProExpenseList"
    this.onClickListItem('PEXL')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Account") {
    this.key = 6
    this.navigation = "Account"
    this.onClickListItem('A')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "AccountConfig") {
    this.key = 7
    this.navigation = "AccountConfig"
    this.onClickListItem('AC')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Customer") {
    this.key = 8
    this.navigation = "Customer"
    this.onClickListItem('C')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Supplier") {
    this.key = 8
    this.navigation = "Supplier"
    this.onClickListItem('SUB')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "SuppForex") {
    this.key = 8
    this.navigation = "SuppForex"
    this.onClickListItem('SF')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "") {
    this.key = 0
    this.navigation = "Home"
    this.onClickListItem('H')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "ExpenseDynamic") {
    this.key = 0
    this.navigation = "ExpenseDynamic"
    this.onClickListItem('ED')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Product") {
    this.key = 0
    this.navigation = "Product"
    this.onClickListItem('P')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "ProductCat") {
    this.key = 0
    this.navigation = "ProductCat"
    this.onClickListItem('PC')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "ProductGroup") {
    this.key = 0
    this.navigation = "ProductGroup"
    this.onClickListItem('PG')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "ProductUnit") {
    this.key = 0
    this.navigation = "ProductUnit"
    this.onClickListItem('PU')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "ProductUnitCon") {
    this.key = 0
    this.navigation = "ProductUnitCon"
    this.onClickListItem('PUC')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "WareHouse") {
    this.key = 0
    this.navigation = "WareHouse"
    this.onClickListItem('W')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Bank") {
    this.key = 0
    this.navigation = "Bank"
    this.onClickListItem('B')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "BankBranch") {
    this.key = 0
    this.navigation = "BankBranch"
    this.onClickListItem('BB')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "BankAccount") {
    this.key = 0
    this.navigation = "BankAccount"
    this.onClickListItem('BA')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Invoice") {
    this.key = 0
    this.navigation = "Invoice"
    this.onClickListItem('I')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }
  else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "InvoiceM") {
    this.key = 0
    this.navigation = "InvoiceM"
    this.onClickListItem('IM')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "PaymentFromCompany") {
    this.key = 0
    this.navigation = "PaymentFromCompany"
    this.onClickListItem('PFC')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "PaymentToCompany") {
    this.key = 0
    this.navigation = "PaymentToCompany"
    this.onClickListItem('PTC')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "ProductPricing") {
    this.key = 0
    this.navigation = "ProductPricing"
    this.onClickListItem('PP')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "StockIn") {
    this.key = 0
    this.navigation = "StockIn"
    this.onClickListItem('SI')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "StockMovement") {
    this.key = 0
    this.navigation = "StockMovement"
    this.onClickListItem('SM')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "JournalDynamic") {
    this.key = 0
    this.navigation = "JournalDynamic"
    this.onClickListItem('JD')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "ProductStock") {
    this.key = 0
    this.navigation = "ProductStock"
    this.onClickListItem('PS')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "StockMovement") {
    this.key = 0
    this.navigation = "StockMovement"
    this.onClickListItem('SM')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "FinancialReports") {
    this.key = 0
    this.navigation = "FinancialReports"
    this.onClickListItem('FR')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "SalesReports") {
    this.key = 0
    this.navigation = "SalesReports"
    this.onClickListItem('SR')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "PurchaseReports") {
    this.key = 0
    this.navigation = "PurchaseReports"
    this.onClickListItem('PR')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "InventoryReports") {
    this.key = 0
    this.navigation = "InventoryReports"
    this.onClickListItem('IR')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "FinancialReportsPage") {
    this.key = 0
    this.navigation = "FinancialReportsPage"
    this.onClickListItem('FRP')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Cheque") {
    this.key = 0
    this.navigation = "Cheque"
    this.onClickListItem('CTC')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Cheque2") {
    this.key = 0
    this.navigation = "Cheque2"
    this.onClickListItem('CTC2')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Charts") {
    this.key = 0
    this.navigation = "Charts"
    this.onClickListItem('Charts')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "ECharts") {
    this.key = 0
    this.navigation = "ECharts"
    this.onClickListItem('ECharts')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "FiscalYear") {
    this.key = 0
    this.navigation = "FiscalYear"
    this.onClickListItem('FY')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "AccountOpen") {
    this.key = 0
    this.navigation = "AccountOpen"
    this.onClickListItem('AO')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "StockOpen") {
    this.key = 0
    this.navigation = "StockOpen"
    this.onClickListItem('SO')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "CustOpen") {
    this.key = 0
    this.navigation = "CustOpen"
    this.onClickListItem('CO')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "SuppOpen") {
    this.key = 0
    this.navigation = "SuppOpen"
    this.onClickListItem('SUO')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  } else {
    this.key = 0
    this.navigation = "Home"
    this.onClickListItem('H')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }

//   var header = document.getElementById("myDIV");
// var btns = header.getElementsByClassName("side_list_item");
//   var current = document.getElementsByClassName("active");
//   current[0].className = current[0].className.replace(" active", "");
//   btns[this.key].className += " active";

  // this._auth.login(this.model);
  // this._auth.logout();
  localStorage.setItem(this._globals.baseAppName + '_language', this.lang_LS);
  var header = document.getElementById("myDIV");
var btns = header!.getElementsByClassName("side_list_item");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", ()=> {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  btns[0].className += " active";
  });
}
  console.log(this.navigation);
    this.break =
    window.innerWidth <= 740
      ? false
      : true;
  }

  

  onSignOut() {
    this._auth.logout();
  }

  onBusiness(name: string) {
    this.navigation = "Home"
    localStorage.getItem(this._globals.baseAppName + '_nav');
    var header = document.getElementById("myDIV");
var btns = header!.getElementsByClassName("side_list_item");
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  btns[0].className += " active";
  
  
}

onToggle() {
  this.break = !this.break
}
  
  onClickListItem(event: string) {
    if(event == 'H' ) {
      this.navigation = "Home"
      var header = document.getElementById("myDIV");
      var btns = header!.getElementsByClassName("side_list_item");
      var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  btns[0].className += " active";
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Home clicked", this.navigation);
    }else if(event == 'A' ) {
      this.navigation = "Account"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Account clicked", this.navigation);
    }else if(event == 'T' ) {
      this.navigation = "Tax"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Tax clicked", this.navigation);
    }else if(event == 'F' ) {
      this.navigation = "Forex"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Forex clicked", this.navigation);
    }
    else if(event == 'BP' ) {
      this.navigation = "BusinessProfile"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Bussiness Profile clicked", this.navigation);
    }
    else if(event == 'J' ) {
      this.navigation = "JournalEntry"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Journal entry clicked", this.navigation);
    }else if(event == 'SF' ) {
      this.navigation = "SuppForex"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Journal entry clicked", this.navigation);
    }else if(event == 'E' ) {
      this.navigation = "Expense"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'ED' ) {
      this.navigation = "ExpenseDynamic"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'AC' ) {
      this.navigation = "AccountConfig"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("AccountConfig entry clicked", this.navigation);
    }else if(event == 'PEX' ) {
      this.navigation = "ProExpense"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("AccountConfig entry clicked", this.navigation);
    }else if(event == 'PIN' ) {
      this.navigation = "ProInv"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("AccountConfig entry clicked", this.navigation);
    }else if(event == 'PEXL' ) {
      this.navigation = "ProExpenseList"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("AccountConfig entry clicked", this.navigation);
    }else if(event == 'C' ) {
      this.navigation = "Customer"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'P' ) {
      this.navigation = "Product"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'SUB' ) {
      this.navigation = "Supplier"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PC' ) {
      this.navigation = "ProductCat"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PG' ) {
      this.navigation = "ProductGroup"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PU' ) {
      this.navigation = "ProductUnit"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PUC' ) {
      this.navigation = "ProductUnitCon"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'W' ) {
      this.navigation = "WareHouse"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'B' ) {
      this.navigation = "Bank"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'BB' ) {
      this.navigation = "BankBranch"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'BA' ) {
      this.navigation = "BankAccount"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'I' ) {
      this.navigation = "Invoice"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'IM' ) {
      this.navigation = "InvoiceM"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'FY' ) {
      this.navigation = "FiscalYear"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'AO' ) {
      this.navigation = "AccountOpen"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'SO' ) {
      this.navigation = "StockOpen"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'CO' ) {
      this.navigation = "CustOpen"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'SUO' ) {
      this.navigation = "SuppOpen"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PFC' ) {
      this.navigation = "PaymentFromCompany"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PTC' ) {
      this.navigation = "PaymentToCompany"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PP' ) {
      this.navigation = "ProductPricing"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'SI' ) {
      this.navigation = "StockIn"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'SM' ) {
      this.navigation = "StockMovement"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'JD' ) {
      this.navigation = "JournalDynamic"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PS' ) {
      this.navigation = "ProductStock"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'FR' ) {
      this.navigation = "FinancialReports"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'SR' ) {
      this.navigation = "SalesReports"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PR' ) {
      this.navigation = "PurchaseReports"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'IR' ) {
      this.navigation = "InventoryReports"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'FRP' ) {
      this.navigation = "FinancialReportsPage"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'CTC' ) {
      this.navigation = "Cheque"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'CTC2' ) {
      this.navigation = "Cheque2"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'Charts' ) {
      this.navigation = "Charts"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'ECharts' ) {
      this.navigation = "ECharts"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }
  }

  onChangeLanguage() {
    this.navigation = "Home"
    var header = document.getElementById("myDIV");
    var btns = header!.getElementsByClassName("side_list_item");
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      btns[0].className += " active";
    if (localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.lang = "Arabic"
      this.direction = "ltr"
      this.home = "Home"
      this.businessP = "Company profile"
      this.journal = "Journal"
      this.expense = "Expenses"
      this.paymentFromCompany = "Payment to supplier"
      this.paymentToCompany = "Customer payment"
      this.tax = "Tax"
      this.invoice = "Invoice"
      this.invoiceM = "Invoice (cubic meter)"
      this.bank = "Bank"
      this.fym = "Financial year management"
      this.purchase = "Purchase"
      this.bankBranch = "Bank branch"
      this.bankAccount = "Bank account"
      this.forex = "Forex"
      this.customer = "Customer"
      this.proExpense = "Procurement expenses"
      this.proInv = "Purchase invoice"
      this.proExpenseList = "Procurement expense list"
      this.accountConfiguration = "Account configuration"
      this.account = "Account"
      this.accounting = "Accounting"
      this.config = "Configurations"
      this.sales = "Sales"
      this.fiscalYear = "Fiscal year"
      this.accountOpen = "Account opening balance"
      this.StockOpen = "Stock opening"
      this.CustOpen = "Customer opening balance"
      this.SuppOpen = "Supplier opening balance"
      this.inventory = "Inventory"
      this.product = "Product"
      this.profile = "Profile"
      this.supplier = "Supplier"
      this.reports = "Reports"
      this.suppForex = "Purchase forex"
      this.productCategory = "Product category"
      this.productGroup = "Product group"
      this.productUnit = "Product unit"
      this.productPricing = "Product pricing"
      this.productStock = "Product stock"
      this.productUnitConversion = "Product unit conversion"
      this.warehouse = "Warehouse"
      this.stockIn = "Stock in"
      this.stockMovement = "Stock movement"
      this.financialReports = "Financial reports"
      this.salesReports = "Sales reports"
      this.purchaseReports = "Purchase reports"
      this.inventoryReports = "Inventory reports"
      this.cheque = "Cheque to"
      this.cheque2 = "Cheque from"
      this.logout = "Logout"
      this.change = "Language:"
      
      
      this.lang_LS = "16001"
    }else if (localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.lang = "الانجليزية"
      this.lang_LS = "16002"
      this.direction = "rtl"
      this.home = " الرئيسية "
      this.businessP = "حساب الشركة"
      this.journal = "السجلات"
      this.invoice = "الفواتير"
      this.invoiceM = "الفواتير (المتر المربع)"
      this.bank = "البنك"
      this.reports = "التقارير"
      this.paymentFromCompany = "الدفع الى الممول"
      this.suppForex = "فوركس الشراء"
      this.paymentToCompany = "الدفع الى الشركة"
      this.bankBranch = "فرع البنك"
      this.bankAccount = "حساب البنك"
      this.accountConfiguration = "اعداد الحسابات"
      this.expense = "المصروفات"
      this.tax = "الضرائب"
      this.customer = "العميل"
      this.forex = "فوركس"
      this.fym = "ادارة السنة المالية"
      this.account = "الحسابات"
      this.purchase = "عمليات الشراء"
      this.accounting = "الحسابات"
      this.proExpense = "حساب المشتريات"
      this.proInv = "فواتير الشراء"
      this.proExpenseList = "قائمة حساب المشتريات"
      this.config = "الاعدادات"
      this.sales = "المبيعات"
      this.inventory = "المخزون"
      this.profile = "ملف المستخدم"
      this.supplier = "الممول"
      this.product = "المنتجات"
      this.fiscalYear = "السنة المالية"
      this.accountOpen = "رصيد فتح الحساب"
      this.StockOpen = "افتتاح المخزون"
      this.CustOpen = "الرصيد الافتتاحي للعميل"
      this.SuppOpen = "الرصيد الافتتاحي للمورد"
      this.productCategory = "اصناف المنتجات"
      this.productGroup = "مجموعات المنتجات"
      this.productUnit = "وحدات المنتجات"
      this.productPricing = "تسعيرة المنتجات"
      this.productStock = "مخزون المنتجات"
      this.productUnitConversion = "تحويل وحدة المنتجات"
      this.warehouse = "المخازن"
      this.stockIn = "المخزون الداخل"
      this.stockMovement = "المخزون الخارج"
      this.cheque = "الشيكات الى"
      this.cheque2 = "الشيكات من"
      this.financialReports = "التقارير المالية"
      this.salesReports = "تقارير المبيعات"
      this.purchaseReports = "تقارير الشراء"
      this.inventoryReports = "تقارير المخزون"
      this.logout = "تسجيل الخروج"
      this.change = "اللغة:"
    }else if (localStorage.getItem(this._globals.baseAppName + '_language') == "") {
      this.lang = "Arabic"
      this.direction = "ltr"
      this.home = "Home"
      this.businessP = "Business Profile"
      this.journal = "journal"
      this.invoice = "Invoice"
      this.invoiceM = "Invoice (cubic meter)"
      this.paymentFromCompany = "Company payment"
      this.paymentToCompany = "Customer payment"
      this.expense = "Expenses"
      this.customer = "Customer"
      this.accountConfiguration = "Account Configuration"
      this.tax = "Tax"
      this.fym = "Financial year management"
      this.fiscalYear = "Fiscal year"
      this.accountOpen = "Account opening balance"
      this.StockOpen = "Stock opening"
      this.CustOpen = "Customer opening balance"
      this.SuppOpen = "Supplier opening balance"
      this.proExpense = "Procurement expenses"
      this.proInv = "Purchase invoice"
      this.proExpenseList = "Procurement expense list"
      this.suppForex = "Purchase forex"
      this.forex = "Forex"
      this.account = "Account"
      this.reports = "Reports"
      this.accounting = "Accounting"
      this.config = "Configurations"
      this.sales = "Sales"
      this.profile = "Profile"
      this.inventory = "Inventory"
      this.financialReports = "Financial reports"
      this.salesReports = "Sales reports"
      this.purchaseReports = "Purchase reports"
      this.inventoryReports = "Inventory reports"
      this.supplier = "Supplier"
      this.product = "Product"
      this.purchase = "Purchase"
      this.productCategory = "Product category"
      this.productGroup = "Product group"
      this.productUnit = "Product unit"
      this.productPricing = "Product pricing"
      this.productStock = "Product stock"
      this.productUnitConversion = "Product unit conversion"
      this.warehouse = "Warehouse"
      this.stockIn = "Stock in"
      this.stockMovement = "Stock movement"
      this.cheque = "Cheque to"
      this.cheque2 = "Cheque from"
      this.logout = "Logout"
      this.change = "Change to:"
      
      this.lang_LS = "16001"
    }
    localStorage.setItem(this._globals.baseAppName + '_language', this.lang_LS);
    console.log("lang: ",localStorage.getItem(this._globals.baseAppName + '_language'))
  }

  onResize(event: any){
    this.break =
    window.innerWidth <= 740
      ? false
      : true;
  }
  resizeValidate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

  resizeEdges(){
    if(localStorage.getItem(this._globals.baseAppName + '_language') == '16001'){
      return {right: true}
    } else {return{left: true}}
  }
 
                    /**
                     * Finilizes resize positions
                     * (used for drawer/sidenav width)
                     * @param event 
                     */
  onResizeEnd(event: ResizeEvent): void {
    this.resizeStyle = {
                     // enable/disable these per your needs
      // position: 'fixed',
      // left: `${event.rectangle.left}px`,
      // top: `${event.rectangle.top}px`,
      // height: `${event.rectangle.height}px`,
      width: `${event.rectangle.width}px`,
    };
  }

}
