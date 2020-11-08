"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CompareFieldsValidator {
    constructor() {
        this.thisIsNotEqual = [];
    }
    async validate(input) {
        const { checkThis, withThis } = input;
        checkThis !== withThis && this.thisIsNotEqual.push(withThis);
        return this.thisIsNotEqual;
    }
}
exports.CompareFieldsValidator = CompareFieldsValidator;
//# sourceMappingURL=compare-fields-validator.js.map