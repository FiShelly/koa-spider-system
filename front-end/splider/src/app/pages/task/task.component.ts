import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Schedule} from '../../shared-module/models/Schedule';
import {ScheduleService} from '../../shared-module/services/schedule.service';
import {ModalService} from 'ng-sm-ui';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, AfterViewInit {

    listOperations: object = {
        width: 120,
        text: '操作',
        list: [
            {
                name: 'download',
                text: '下载'
            },
            {
                name: 'cancel',
                text: '取消'
            }
        ]
    };
    listFormat: object = [
        {
            name: 'id',
            text: '配置Id',
            width: 100
        },
        {
            name: 'cnt',
            text: '执行次数',
            width: 100
        },
        {
            name: 'delayedTime',
            text: '频率',
            width: 100
        },
        {
            name: 'config',
            text: '配置',
        }
    ];
    scheduleList: Schedule[] = [];

    constructor(
        private scheduleService: ScheduleService,
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
        this.scheduleService.getList().subscribe({
            next: (data) => {
                this.scheduleList = data.list.map(v => {
                    delete v.resultList;
                    delete v.html;
                    v.cnt = `${v.cnt}`;
                    v.config = JSON.stringify(v);
                    return new Schedule(v);
                });
            },
            error: (e) => {
                this.commonAlert('警告', e.message);
            }
        });
    }

    onOperation(e) {
        switch (e.op) {
            case 'cancel':
                this.scheduleService.cancel(e.item.id).subscribe({
                    next: () => {
                        this.handleGetList();
                    },
                    error: () => {
                        this.commonAlert('警告', e.message);
                    }
                });
                break;
            case 'download':
                window.open(`/web/schedule/download/${e.item.id}`);
                break;
        }
    }


    ngAfterViewInit(): void {
        this.handleGetList();
    }
}
