import { normalUtil } from './index';

const validator = normalUtil.validator;

export default function validate (obj, rules) {
    if (validator.isEmpty(rules)) {
        throw new Error('rules-is-empty');
    }
    if (!validator.isObject(rules)) {
        throw new Error('rules-is-not-object');
    }
    const values = [];
    Object.keys(rules).forEach(key => {
        const ruleVal = rules[key];
        if (validator.isEmpty(rules[key])) {
            throw new Error('rules-key-is-empty');
        }
        const ruleArray = ruleVal.split('|');
        const result = ruleArray.filter(ra => !validator[ra](obj[key]));
        if (result.length > 0) {
            values.push({[key]: result.join('|')});
        }
    });
    if (values.length > 0) {
        const error = new Error('validate-not-pass');
        error.values = values;
        throw error;
    }
}