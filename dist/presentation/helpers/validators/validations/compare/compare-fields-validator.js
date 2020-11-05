"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CompareFieldsValidator {
    async validate(input) {
        var _a;
        const { checkThis, withThis } = input;
        return (_a = checkThis === withThis) !== null && _a !== void 0 ? _a : true;
    }
}
exports.CompareFieldsValidator = CompareFieldsValidator;
//# sourceMappingURL=compare-fields-validator.js.map