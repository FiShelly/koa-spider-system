/**
 */

export class Proxy {
    ip: string;
    port: string;
    response_time: string;
    location: string;
    last_validate: string;
    type: string;

    constructor(props?: any) {
        if (props) {
            Object.keys(props).forEach(k => {
                this[k] = props[k];
            });
        }
    }

}
