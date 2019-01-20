import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs';
import {StorageService, validator} from 'ng-sm-ui';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private storage: StorageService,
        private router: Router,
    ) {

    }

    guardLogin(url: string) {
        const loginedUser = this.storage.create(false).getItem('logined-user');
        if (validator.isEmpty(loginedUser)) {
            window.location.href = (<any>window).environment.ucUrl;
            return false;
        }
        return true;
    }

    canLoad(route: Route) {
        const url = `/${route.path}`;
        return this.guardLogin(url);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const url: string = state.url;
        return this.guardLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const url: string = state.url;
        return this.guardLogin(url);
    }

}
