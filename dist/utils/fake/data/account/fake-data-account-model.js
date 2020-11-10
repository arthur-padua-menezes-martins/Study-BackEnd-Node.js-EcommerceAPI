"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fake_data_sign_up_http_request_body_1 = require("../user/sign-up/fake-data-sign-up-http-request-body");
exports.accountModelEnabled = {
    personal: Object.assign(Object.assign({}, fake_data_sign_up_http_request_body_1.fakeDataSignUpHttpRequestBodyMatch.personal), { password: 'encrypted_password' }),
    address: fake_data_sign_up_http_request_body_1.fakeDataSignUpHttpRequestBodyMatch.address,
    enabled: true,
    id: 'valid_id'
};
exports.accountModelDisabled = {
    personal: Object.assign(Object.assign({}, fake_data_sign_up_http_request_body_1.fakeDataSignUpHttpRequestBodyMatch.personal), { password: 'encrypted_password' }),
    address: fake_data_sign_up_http_request_body_1.fakeDataSignUpHttpRequestBodyMatch.address,
    enabled: false,
    id: 'valid_id'
};
//# sourceMappingURL=fake-data-account-model.js.map