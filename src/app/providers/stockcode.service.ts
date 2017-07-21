import { Injectable }    from '@angular/core';

import { Headers, Http } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { StockCode } from './../models/stockcode';

//mock
//import { HEROES } from './../mock/mock-heroes';

@Injectable()
export class StockCodeService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    //private stockcodesUrl = 'http://192.168.0.20:3001/db/stockcodes';  // URL to web api
    private stockcodesUrl = 'http://localhost:3001/db/stockcodes';  // URL to web api

    constructor( private http: Http ) { }

    getStockCodes(): Promise<StockCode[]> {
        return this.http.get(this.stockcodesUrl)
            .toPromise()
            .then(response => response.json().data as StockCode[])
            .catch(this.handleError);
    }
        
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}