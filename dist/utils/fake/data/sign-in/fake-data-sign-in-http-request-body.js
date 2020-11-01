"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getsignInHttpRequestBodyNotMatchField = exports.signInHttpRequestBodyMissingField = exports.signInHttpRequestBodyNotMatch = exports.signInHttpRequestBodyMatchComplete = exports.signInHttpRequestBodyMatch = exports.signInHttpRequestBodyFields = void 0;
exports.signInHttpRequestBodyFields = ['email', 'password'];
const signInHttpRequestBodyMatchData = {
    email: 'arthur.software.developer@gmail.com',
    password: 'password123'
};
exports.signInHttpRequestBodyMatch = Object.assign({}, signInHttpRequestBodyMatchData);
exports.signInHttpRequestBodyMatchComplete = Object.assign({}, signInHttpRequestBodyMatchData);
exports.signInHttpRequestBodyNotMatch = {
    email: '$#@!%¨&*()_+[]{}`^?:;/~@',
    password: 'pass'
};
exports.signInHttpRequestBodyMissingField = {
    email: 'arthur.software.developer@gmail.com'
};
exports.getsignInHttpRequestBodyNotMatchField = (fieldName) => {
    return exports.signInHttpRequestBodyNotMatch[fieldName];
};
//# sourceMappingURL=fake-data-sign-in-http-request-body.js.map