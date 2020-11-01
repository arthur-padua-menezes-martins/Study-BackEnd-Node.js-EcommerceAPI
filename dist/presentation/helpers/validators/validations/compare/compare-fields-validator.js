"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompareFieldsValidator = void 0;
class CompareFieldsValidator {
    async validate(input) {
        var _a;
        const { checkThis, withThis } = input;
        return (_a = checkThis === withThis) !== null && _a !== void 0 ? _a : true;
    }
}
exports.CompareFieldsValidator = CompareFieldsValidator;
