/**
 */

export class Schedule {
    ip: string;
    cnt: string;
    delayedTime: string;
    config: string;

    constructor(props?: any) {
        if (props) {
            Object.keys(props).forEach(k => {
                this[k] = props[k];
            });
        }
    }

}
