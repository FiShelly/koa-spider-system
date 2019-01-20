import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Proxy} from '../../shared-module/models/Proxy';
import {ModalService} from 'ng-sm-ui';
import {ProxyService} from '../../shared-module/services/proxy.service';

@Component({
    selector: 'app-proxy',
    templateUrl: './proxy.component.html',
    styleUrls: ['./proxy.component.scss']
})
export class ProxyComponent implements OnInit, AfterViewInit {
    // IP	端口	响应时间	位置	最后验证时间
    listOperations: object = {
        width: 120,
        text: '操作',
        list: [
            {
                name: '-',
                text: '-'
            }
        ]
    };
    listFormat: object = [
        {
            name: 'type',
            text: '协议类别',
        },
        {
            name: 'ip',
            text: 'IP'
        },
        {
            name: 'port',
            text: '端口',
        },
        {
            name: 'response_time',
            text: '响应时间',
        },
        {
            name: 'location',
            text: '位置',
        },
        {
            name: 'last_validate',
            text: '最后验证时间',
        }
    ];
    proxyList: Proxy[] = [];

    constructor(
        private proxyService: ProxyService,
        private modalService: ModalService
    ) {
    }

    private commonAlert(title, msg) {
        setTimeout(() => {
            this.modalService.modal.alert({
                input: {
                    title: title,
                    text: msg,
                }
            });
        });
    }

    ngOnInit() {
    }

    handleGetList($e ?: Event) {
        this.proxyService.getList().subscribe({
            next: (data) => {
                this.proxyList = data.list.map(v => {
                    return new Proxy(v);
                });
            },
            error: (e) => {
                this.commonAlert('警告', e.message);
            }
        });
    }

    ngAfterViewInit(): void {
        this.handleGetList();
    }
}
