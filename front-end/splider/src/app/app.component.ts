import {Component} from '@angular/core';
import {MenuItem, ModalService} from 'ng-sm-ui';
import {common} from './shared-module/utils/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'spider';
    menuData: MenuItem[] = common.crcreateMenuDataeat();

    constructor(
        private modalService: ModalService
    ) {
    }
}
