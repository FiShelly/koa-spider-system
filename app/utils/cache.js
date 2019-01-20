import moment from 'moment';
import { normalUtil } from './';

const {validator} = normalUtil;

export default class Cache {
    constructor () {
        this.cacheMap = new Map();
    }

    static CreateData (val, time = 60) {
        return {
            data: val,
            time: moment().unix() + time
        };
    }

    static Check (key) {
        if (validator.isEmpty(key)) {
            throw new Error('the key can not be empty');
        }
        return true;
    }

    set (key, val, time = 60) {
        if (Cache.Check(key)) {
            const data = Cache.CreateData(val, time);
            this.cacheMap.set(key, data);
        }
    }

    get (key) {
        if (Cache.Check(key)) {
            const data = this.cacheMap.get(key);
            if (!data || data.time < moment().unix()) {
                this.cacheMap.delete(key);
                return null;
            }
            return data.data;
        }
    }

    pull (key) {
        const data = this.get(key);
        this.cacheMap.delete(key);
        return data;
    }
}
