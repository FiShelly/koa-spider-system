import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {NgSmUiModule} from 'ng-sm-ui';
import {SharedModuleModule} from './shared-module/shared-module.module';
import {ComponentsModule} from './components/components.module';
import {PagesModule} from './pages/pages.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
            headerName: 'x-csrf-token'
        }),
        NgSmUiModule,
        ComponentsModule,
        SharedModuleModule,
        PagesModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
