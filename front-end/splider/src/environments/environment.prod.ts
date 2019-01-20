const pre_path = '';
export const environment = {
    production: true,
    apiURL: {
        login: `${pre_path}/web/user/login`,
        logout: `${pre_path}/web/oauth/logout`,
        workResFul: `${pre_path}/web/work/`,
        proxyipResFul: `${pre_path}/web/proxyip/`,
        scheduleResFul: `${pre_path}/web/schedule/`,
        userResFul: `${pre_path}/web/oauth/`
    },
    webURL: {
        'index': pre_path,
    },
    ucUrl: 'https://uc.fishelly.top'
};
