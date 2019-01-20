import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {Observable} from 'rxjs';
import {WorkItem} from '../models/WorkItem';

@Injectable({
    providedIn: 'root'
})
export class WorkService extends CommonService {
    private createUrl(text: any, url?: string) {
        url = url || this.apiURL.workResFul;
        return `${url}${text}`;
    }

    public saveAll(data): Observable<any> {
        data = data.map(v => {
            v.html = '';
            v.resultList = [];
        });
        return this.hc.post<any>(this.createUrl('all'), {
            configs: JSON.stringify(data)
        });
    }

    public delete(id: number): Observable<any> {
        return this.hc.delete<WorkItem>(this.createUrl(id));
    }

    public createWork(data: WorkItem): Observable<any> {
        return this.hc.post<WorkItem>(this.createUrl(''), {
            config: JSON.stringify(data)
        });
    }

    public modifyWork(data: WorkItem): Observable<any> {
        data.html = '';
        data.resultList = '';
        return this.hc.put<WorkItem>(this.createUrl(data.id), {
            config: JSON.stringify(data)
        });
    }

    public getList(): Observable<any> {
        return this.hc.get<WorkItem[]>(this.createUrl(''));
    }
}
