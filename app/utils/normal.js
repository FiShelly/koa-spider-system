const errorMap = {
    'login-invalidate': '登录失败：账号密码错误',
    'mysql-error': '数据库错误',
    'input-invalidate': '输入不合法',
    'input-invalidate-empty': '输入参数为空',
    'input-invalidate-number': '输入参数必须为数字',
    'input-invalidate-status': '非法的文章状态',
    'input-invalidate-oldPwd': '旧密码输入不正确',
    'data-not-find': '数据未找到或不存在',
    'data-is-exist': '数据已存在',
    'no-auth-app': '当前账号无访问此应用权限',
    'no-logined': '未登录',
    'too-frequent': '访问太频繁',
    'must-be-image': '必须是图片',
    'must-be-local-site': '必须是本站点访问',
    'access-token-empty': '',
    'access-token-expired': 'access-token已过期',
    'expired-time': '时间已过期',
    'can-not-delete-fishelly': '无法删除此账号',
    'user-exist': '当前用户已存在',

};

const deepClone = function (data) {
    return JSON.parse(JSON.stringify(data));
};

const _changeData = function (data) {
    if (data && data.hasOwnProperty('count') && data.hasOwnProperty('rows')) {
        data = {
            total: data.count,
            list: data.rows
        };
    }
    data = deepClone(data);
    if (!data) {
        return null;
    }
    if (data instanceof Array) {
        data = {list: data};
    }
    return data;
};

const redirectData = function (status = 302, url, msg) {
    return {
        status, url, msg: errorMap[msg]
    };
};

const packData = function (code, status, data) {
    if (status === 'success') {
        return {
            code: code,
            status: status,
            data: _changeData(data)
        };
    } else {
        return {
            code: code,
            status: status,
            msg: errorMap[data] || data
        };
    }
};

const validator = {
    isEmpty (obj) {
        return typeof obj === 'undefined' || obj === null || (typeof obj === 'string' && obj.length === 0);
    },
    required (obj) {
        return !this.isEmpty(obj)
    },
    isNumeric (obj) {
        return !isNaN(parseFloat(obj)) && isFinite(obj);
    },
    numberic (obj) {
        return this.isNumeric(obj);
    },
    numeric (obj) {
        return this.isNumeric(obj);
    },
    isObject (obj) {
        return typeof obj === 'object' && !(obj instanceof Array);
    },
    email (obj) {
        return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(obj);
    },
    chinese (obj) {
        return /^[\u4e00-\u9fa5]{0,}$/.test(obj);
    },
    english (obj) {
        return /^[a-zA-Z]+$/.test(obj);
    },
    url (obj) {
        return /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/.test(obj);
    },
    idcard (obj) {
        return /(^\d{15}$)|(^\d{17}(x|X|\d)$)/.test(obj);
    },
    mobile (obj) {
        return /^1(3|4|5|7|8)[0-9]\d{8}$/.test(obj);
    },
    document (obj) {
        return /\.doc(x?)$|\.xls(x?)$|\.ppt(x?)$|\.wps$|\.pef$|\.txt$/i.test(obj);
    },
    image (obj) {
        return /\.png|\.jpg$|\.jpeg$|\.bmp$|\.gif$/i.test(obj);
    },
    video (obj) {
        return /\.wmv$|\.avi$|\.mkv$|\.mp4$|\.rmvb$/i.test(obj);
    },
    audio (obj) {
        return /\.mp3/i.test(obj);
    },
    archive (obj) {
        return /\.rar$|\.zip$|\.7z$|\.gzip$|\.tar$|\.iso$/i.test(obj);
    }
};

const userAgents = [
    'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
    'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Acoo Browser; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506)',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20',
    'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.71 Safari/537.1 LBBROWSER',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0) ,Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
    'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
    'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; QQDownload 732; .NET4.0C; .NET4.0E)',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:2.0b13pre) Gecko/20110307 Firefox/4.0b13pre',
    'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52',
    'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; LBBROWSER)',
    'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6',
    'Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3) Arora/0.6',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
    'Opera/9.25 (Windows NT 5.1; U; en), Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
];

function getUserAgent () {
    return userAgents[parseInt(Math.random() * userAgents.length)];
}

export default {packData, deepClone, validator, redirectData, getUserAgent};