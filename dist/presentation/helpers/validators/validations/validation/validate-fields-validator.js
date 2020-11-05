"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidateFieldsValidator {
    constructor(validator) {
        this.validator = validator;
    }
    async validate(input) {
        return this.validator.exec(input);
    }
}
exports.ValidateFieldsValidator = ValidateFieldsValidator;
//# sourceMappingURL=validate-fields-validator.js.map