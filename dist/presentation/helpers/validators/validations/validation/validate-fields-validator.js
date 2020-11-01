"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateFieldsValidator = void 0;
class ValidateFieldsValidator {
    constructor(validator) {
        this.validator = validator;
    }
    async validate(input) {
        return this.validator.exec(input);
    }
}
exports.ValidateFieldsValidator = ValidateFieldsValidator;
