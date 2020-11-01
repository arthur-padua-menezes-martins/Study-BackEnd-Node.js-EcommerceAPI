"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameValidatorAdapter = void 0;
class NameValidatorAdapter {
    async isValid(value) {
        return await Promise.resolve(Boolean(value.match(/^[a-zA-Z\u00C0-\u017F´]+\s+[a-zA-Z\u00C0-\u017F´]{0,}$/)));
    }
}
exports.NameValidatorAdapter = NameValidatorAdapter;
