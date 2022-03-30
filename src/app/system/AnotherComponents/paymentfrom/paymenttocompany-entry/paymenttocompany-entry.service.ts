import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';


import { Send } from '../../../../send.model';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { Observable } from 'rxjs';
import { BankDeposittocompanyModel, chequetocompanyModel, paymenttocompanyattachmentModel, wiretransfertocompanyModel } from '../paymenttocompany.model';


@Injectable({
    providedIn: 'root'
})
export class PaymentToCompanyEntryService {
    
    
    constructor(private _globals: AppGlobals,
        private httpClient: HttpClient,
        private _cf: CommonService,
        private http: Http,
        private _auth: AuthService) {}



        Controllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'paymentfromcompany/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        EntryA(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'paymentfromcompany/createuniv',arr);
        }

        EntryE(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'paymentfromcompany/edituniv',arr);
        }
        child1ItemControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'ChequeFromCompany/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        getChild1ItembyChild1(id: number): Observable<chequetocompanyModel[]> {
            return this.httpClient.get<chequetocompanyModel[]>(this._globals.baseAPIUrl + 'ChequeFromCompany/bypayment/' + id).pipe(
            map((result: chequetocompanyModel[]) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }

           child2ItemControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'WireTransferFromCompany/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        getChild2ItembyChild2(id: number): Observable<wiretransfertocompanyModel[]> {
            return this.httpClient.get<wiretransfertocompanyModel[]>(this._globals.baseAPIUrl + 'WireTransferFromCompany/bypayment/' + id).pipe(
            map((result: wiretransfertocompanyModel[]) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }
           child3ItemControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'BankDepositFromCompany/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        getChild3ItembyChild3(id: number): Observable<BankDeposittocompanyModel[]> {
            return this.httpClient.get<BankDeposittocompanyModel[]>(this._globals.baseAPIUrl + 'BankDepositFromCompany/bypayment/' + id).pipe(
            map((result: BankDeposittocompanyModel[]) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }

           child4ItemControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'PaymentFromCompanyAttachment/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        getChild4ItembyChild4(id: number): Observable<paymenttocompanyattachmentModel[]> {
            return this.httpClient.get<paymenttocompanyattachmentModel[]>(this._globals.baseAPIUrl + 'PaymentFromCompanyAttachment/bypayment/' + id).pipe(
            map((result: paymenttocompanyattachmentModel[]) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }
        
        getMaxCredit(id1: number, id2:number): Observable<any> {
            return this.httpClient.get<any>(this._globals.baseAPIUrl + 'PaymentFromCompany/getcredit/' + id1 + '/' + id2).pipe(
            map((result: any) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }
        



//Bank


}
