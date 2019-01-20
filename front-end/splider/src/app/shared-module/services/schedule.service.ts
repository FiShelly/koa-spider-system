import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {Observable} from 'rxjs';
import {Schedule} from '../models/Schedule';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService extends CommonService {

    private createUrl(text: any, url?: string) {
        url = url || this.apiURL.scheduleResFul;
        return `${url}${text}`;
    }

    public getList(): Observable<any> {
        return this.hc.get<Schedule[]>(this.createUrl(''));
    }

    public cancel(id): Observable<any> {
        return this.hc.delete<Schedule>(this.createUrl(id));
    }

}
