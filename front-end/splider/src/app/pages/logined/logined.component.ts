import {Component, OnInit, AfterViewInit} from '@angular/core';
import {StorageService, EventBusService} from 'ng-sm-ui';
import {UserService} from '../../shared-module/services/user.service';
import {User} from '../../shared-module/models/User';
import {Router} from '@angular/router';

@Component({
    selector: 'app-logined',
    templateUrl: './logined.component.html',
    styleUrls: ['./logined.component.scss']
})
export class LoginedComponent implements OnInit, AfterViewInit {

    global: any = (<any>window).environment;

    constructor(
        private userService: UserService,
        private storageService: StorageService,
        private router: Router,
        private eventBus: EventBusService
    ) {
        document.body.style.display = 'none';
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.userService.getOAuthUser().subscribe({
            next: (item: User) => {
                item.avatar = `${this.global.ucUrl}/web/image/view/${item.headImg}`;
                this.eventBus.emit('logined', item);
                this.storageService.create(false).setItem('logined-user', item);
                this.router.navigateByUrl('work');
            },
            error: (error) => {
                console.log(error);
                window.location.href = this.global.ucUrl;
            },
            complete: () => {
                document.body.style.display = 'block';
            }
        });
    }

}
