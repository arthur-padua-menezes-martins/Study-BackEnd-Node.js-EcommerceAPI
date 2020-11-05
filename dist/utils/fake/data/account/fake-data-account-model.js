"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fake_data_sign_up_http_request_body_1 = require("../user/sign-up/fake-data-sign-up-http-request-body");
exports.accountModelEnabled = Object.assign(Object.assign({ id: 'valid_id' }, fake_data_sign_up_http_request_body_1.signUpHttpRequestBodyMatchComplete), { password: 'encrypted_password', enabled: true });
exports.accountModelDisabled = Object.assign(Object.assign({ id: 'valid_id' }, fake_data_sign_up_http_request_body_1.signUpHttpRequestBodyMatchComplete), { password: 'encrypted_password', enabled: false });
//# sourceMappingURL=fake-data-account-model.js.map