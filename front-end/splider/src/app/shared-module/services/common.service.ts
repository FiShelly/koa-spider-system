import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    protected apiURL: any = {};

    constructor(protected hc: HttpClient) {
        this.apiURL = (<any>window).environment.apiURL;
    }

}
