import {MenuItem} from 'ng-sm-ui';


function createMenuData(): MenuItem[] {
    return MENUDATA.map(val => {
        return new MenuItem(val);
    });
}

const MENUDATA = [
    {
        icon: '&#xe600;',
        text: '开始爬虫',
        isLink: true,
        type: 'post',
        link: '/work'
    },
    {
        icon: '&#xe63f;',
        text: '代理状态',
        isLink: true,
        type: 'post-list',
        link: '/proxy'
    },
    {
        icon: '&#xe655;',
        text: '定时任务状态',
        isLink: true,
        type: 'post-publish',
        link: '/task'
    }
];

const common = {
    crcreateMenuDataeat: createMenuData
};

export {
    common
};
