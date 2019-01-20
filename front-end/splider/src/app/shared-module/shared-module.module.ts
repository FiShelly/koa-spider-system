import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTOR_PROVIDERS} from './interceptor';
import {UserService} from './services/user.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        HTTP_INTERCEPTOR_PROVIDERS,
        UserService
    ],
})
export class SharedModuleModule {
}
