"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequiredFieldsValidator {
    async validate(input) {
        const { fields, body } = input;
        const missingFields = [];
        if (fields.length > 0 && Object.keys(body).length > 0) {
            if (Array.isArray(body)) {
                for (const [index, field] of fields.entries()) {
                    for (const item of field) {
                        !(item in body[index]) && missingFields.push(item);
                    }
                }
            }
            else {
                for (const item of fields) {
                    !(item in body) && missingFields.push(item);
                }
            }
        }
        else if (fields.length > 0) {
            for (const item of fields) {
                missingFields.push(item);
            }
        }
        else if (Object.keys(body).length <= 0) {
            throw new Error();
        }
        return missingFields;
    }
}
exports.RequiredFieldsValidator = RequiredFieldsValidator;
//# sourceMappingURL=required-fields-validator.js.map