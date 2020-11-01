"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidatorAdapter = void 0;
class EmailValidatorAdapter {
    async isValid(value) {
        return await Promise.resolve(Boolean(value.match(/^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)));
    }
}
exports.EmailValidatorAdapter = EmailValidatorAdapter;
