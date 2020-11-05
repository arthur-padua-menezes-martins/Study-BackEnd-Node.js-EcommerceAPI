"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FieldValidationWithRegEx {
    constructor(options) {
        this.fieldValidationOptions = {};
        this.invalidFields = [];
        for (const key in options) {
            this.fieldValidationOptions[key] = options[key];
        }
    }
    /**
    * @param field
    * the field that activates the validation
    * @param value
    * the value for validation
    */
    async options(field, value) {
        if (field in this.fieldValidationOptions) {
            return (await this.fieldValidationOptions[field](value)) ? '' : field;
        }
        else {
            return await Promise.resolve('');
        }
    }
    /**
    * @param input
    * the fields and the body to pass an validation
    */
    async exec(input) {
        const { fields, body } = input;
        if (Array.isArray(body)) {
            for (const [index, field] of fields.entries()) {
                for (const item of field) {
                    this.invalidFields.push(await this.options(item, body[index][item]));
                }
            }
        }
        else {
            for (const item of fields) {
                this.invalidFields.push(await this.options(item, body[item]));
            }
        }
        return ((this.invalidFields.filter(field => field)).slice(0, this.invalidFields.length));
    }
}
exports.FieldValidationWithRegEx = FieldValidationWithRegEx;
//# sourceMappingURL=field-validation-with-reg-ex.js.map