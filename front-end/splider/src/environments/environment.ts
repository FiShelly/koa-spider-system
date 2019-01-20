// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// const pre_path = 'http://localhost:3200';
const pre_path = '';
export const environment = {
    production: false,
    apiURL: {
        login: `${pre_path}/web/user/login`,
        logout: `${pre_path}/web/user/logout`,
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

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
