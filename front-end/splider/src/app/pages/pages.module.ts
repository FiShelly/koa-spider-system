import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProxyComponent} from './proxy/proxy.component';
import {TaskComponent} from './task/task.component';
import {WorkComponent} from './work/work.component';
import {LoginedComponent} from './logined/logined.component';
import {NgSmUiModule} from 'ng-sm-ui';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

@NgModule({
    declarations: [
        ProxyComponent,
        TaskComponent,
        WorkComponent,
        LoginedComponent
    ],
    imports: [
        CommonModule,
        NgSmUiModule,
        FormsModule,
        CodemirrorModule
    ]
})
export class PagesModule {
}
