import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonHeaderComponent} from './common-header/common-header.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        CommonHeaderComponent
    ],
    exports: [
        CommonHeaderComponent,
        CommonModule,
        FormsModule
    ],
    entryComponents: [
        CommonHeaderComponent
    ]
})
export class ComponentsModule {
}
