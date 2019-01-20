import {Component, OnInit, AfterViewInit} from '@angular/core';
import {WorkItem} from '../../shared-module/models/WorkItem';
import {WorkService} from '../../shared-module/services/work.service';
import {ModalService} from 'ng-sm-ui';
import * as JsBeautify from 'js-beautify';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';

const htmlBeautify = JsBeautify.html;

@Component({
    selector: 'app-work',
    templateUrl: './work.component.html',
    styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit, AfterViewInit {

    workList: WorkItem[] = [];
    current: any = {tab: 0};
    resultType: Object[] = [
        {
            text: '链接',
            label: 'link'
        },
        {
            text: '图片',
            label: 'img'
        },
        {
            text: '文件',
            label: 'file'
        },
        {
            text: '内容相关',
            label: 'relate'
        },
        {
            text: '高级',
            label: 'advance'
        },
    ];

    constructor(
        private workService: WorkService,
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

    handleAdd($e ?: Event) {
        this.workList.push(new WorkItem());
    }

    handleSaveAll($e ?: Event) {
        this.workService.saveAll(this.workList).subscribe({
            next: (data) => {
            },
            error: (e) => {
                this.commonAlert('警告', e.message);
            }
        });
    }

    handleAddBtn($e: Event, item: WorkItem) {
        item.advance.push({
            key: '',
            selector: ''
        });
    }

    handleDeleteBtn($e: Event, item: WorkItem, i: number) {
        item.advance.splice(i, 1);
    }

    handleStart($e: Event, workItem, i) {
        this.workService.modifyWork(workItem).subscribe({
            next: (data) => {
                workItem.html = htmlBeautify(data.html, {indent_size: 2, space_in_empty_paren: true});
                workItem.resultList = JsBeautify(JSON.stringify(data.resultList), {indent_size: 2, space_in_empty_paren: true});
            },
            error: (e) => {
                this.commonAlert('警告', e.message);
            }
        });
    }

    handleDelete($e: Event, workItem, i) {
        this.workService.delete(workItem.id).subscribe({
            next: (data) => {
                this.handleGetList();
            },
            error: (e) => {
                this.commonAlert('警告', e.message);
            }
        });
    }

    handleGetList($e ?: Event) {
        this.workService.getList().subscribe({
            next: (data) => {
                const list = data.list;
                if (!list.length) {
                    this.workList = [new WorkItem()];
                } else {
                    this.workList = data.list.map(v => {
                        v.name = v.name || `work - ${v.id}`;
                        v.resultList = JsBeautify(JSON.stringify(v.resultList));
                        v.html = htmlBeautify(v.html, {indent_size: 2, space_in_empty_paren: true});
                        return new WorkItem(v);
                    });
                }
                this.current = {
                    tab: this.workList[0].id
                };
                console.log('e');
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
