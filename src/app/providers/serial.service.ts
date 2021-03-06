import { Injectable }    from '@angular/core';

import { Headers, Http } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Serial } from './../models/serial';

//mock
//import { HEROES } from './../mock/mock-heroes';

@Injectable()
export class SerialService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    //private serialsUrl = 'http://192.168.0.20:3001/db/serials';  // URL to web api
    private serialsUrl = 'http://localhost:3001/db/serials';  // URL to web api

    constructor( private http: Http ) { }

    getSerials(): Promise<Serial[]> {
        return this.http.get(this.serialsUrl)
            .toPromise()
            .then(response => response.json().data as Serial[])
            .catch(this.handleError);
    }
    
    getSerialsSlowly(): Promise<Serial[]> {
        return new Promise(resolve => {
        // Simulate server latency with 2 second delay
        setTimeout(() => resolve(this.getSerials()), 2000);
        });
    }
  

    getSerial(serial: string): Promise<Serial> {
        const url = `${this.serialsUrl}/${serial}/`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Serial)
            .catch(this.handleError);
    }

    findSerials(serial: string): Promise<Serial[]> {
        const url = `${this.serialsUrl}/find/${serial}/`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Serial[])
            .catch(this.handleError);
    }
    findSerialsSlowly(serial: string): Promise<Serial[]>{
        return new Promise(resolve=> {
            setTimeout(() => resolve(this.findSerials(serial)), 2000);
        })
    }
    
    searchSerial(term: string): Observable<Serial[]> {
        return this.http
        .get(`${this.serialsUrl}search?serial=${term}`)
        .map(response => response.json().data as Serial[]);
    }

    update

    /*delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data as Hero)
            .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }*/
        
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}