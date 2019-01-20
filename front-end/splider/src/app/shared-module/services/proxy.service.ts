import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {Observable} from 'rxjs';
import {Proxy} from '../models/Proxy';

@Injectable({
    providedIn: 'root'
})
export class ProxyService extends CommonService {

    private createUrl(text: any, url?: string) {
        url = url || this.apiURL.proxyipResFul;
        return `${url}${text}`;
    }

    public getList(): Observable<any> {
        return this.hc.get<Proxy[]>(this.createUrl(''));
    }
}
