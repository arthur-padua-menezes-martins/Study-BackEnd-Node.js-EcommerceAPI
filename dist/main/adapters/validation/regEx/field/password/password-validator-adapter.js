"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordValidatorAdapter = void 0;
class PasswordValidatorAdapter {
    async isValid(value) {
        return await Promise.resolve(Boolean(value.match(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*[\W_\x7B-\xFF]).{8,16}$/)));
    }
}
exports.PasswordValidatorAdapter = PasswordValidatorAdapter;
