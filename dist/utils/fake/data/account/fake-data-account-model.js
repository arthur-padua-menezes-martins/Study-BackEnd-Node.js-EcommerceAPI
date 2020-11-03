"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountModelMatch = void 0;
const fake_data_sign_up_http_request_body_1 = require("../sign-up/fake-data-sign-up-http-request-body");
exports.accountModelMatch = Object.assign(Object.assign({ id: 'valid_id' }, fake_data_sign_up_http_request_body_1.signUpHttpRequestBodyMatchComplete), { password: 'encrypted_password', enabled: true });
//# sourceMappingURL=fake-data-account-model.js.map