/**
 */
import {util} from 'ng-sm-ui';

export class WorkItem {
    id: any;
    name: string = 'work - 1';
    url: string;
    resultType: string = 'link';
    resultList: any = '';
    html: string = '';
    advance: Object[] = [{key: '', selector: ''}];
    related: string;
    status: string;
    isDelayed: boolean = false;
    isUseProxy: boolean = false;
    delayedTime: string;
    schedule_id: number;

    constructor(props?: any) {
        if (props) {
            Object.keys(props).forEach(k => {
                this[k] = props[k];
            });
        } else {
            this.id = util.randomString();
        }
    }

}
