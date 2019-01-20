import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginedComponent} from './pages/logined/logined.component';
import {ProxyComponent} from './pages/proxy/proxy.component';
import {TaskComponent} from './pages/task/task.component';
import {WorkComponent} from './pages/work/work.component';
import {AuthGuard} from './shared-module/guard/auth.guard';

const appRouting: Routes = [
    {
        path: 'logined',
        component: LoginedComponent
    },
    {
        path: 'proxy',
        component: ProxyComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'task',
        component: TaskComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'work',
        component: WorkComponent,
        canActivate: [AuthGuard]
    },
    {path: '**', redirectTo: '/work', pathMatch: 'full'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRouting)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}
