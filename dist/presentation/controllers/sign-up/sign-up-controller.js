"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sign_up_controller_helpers_1 = require("./sign-up-controller-helpers");
/**
* @method handle
* validates the insertion of a new account in the database
*/
class SignUpController {
    /**
    * @param {ValidationComposite} validation
    * implementation of the validation
    * @param {ISearchAccountByField} readAccount
    * implementation of the user account search manager
    * @param {IAddAccount} writeAccount
    * implementation of the user account registration manager
    * @param {IUpdateEnabledAccount} updateAccount
    * implementation of the user account update enabled status
    * @param {ISendEmailSignUp} emailSender
    * implementation of the email sender
    */
    constructor(validation, readAccount, writeAccount, updateAccount, emailSender) {
        this.validation = validation;
        this.readAccount = readAccount;
        this.writeAccount = writeAccount;
        this.updateAccount = updateAccount;
        this.emailSender = emailSender;
        this.account = null;
    }
    async handle(httpRequest) {
        var _a, _b;
        try {
            if (httpRequest.query.id) {
                await this.updateAccount.updateEnabled(httpRequest.query.id, true);
                this.account = await this.readAccount.searchByField({ id: httpRequest.query.id });
                if ((_a = this.account) === null || _a === void 0 ? void 0 : _a.enabled) {
                    return sign_up_controller_helpers_1.created();
                }
                return sign_up_controller_helpers_1.unprocessable();
            }
            else {
                const missingFields = await this.validation.validate({
                    type: 'required fields',
                    fields: [sign_up_controller_helpers_1.signUpHttpRequestBodyFields, sign_up_controller_helpers_1.signUpHttpRequestBodyAddressFields],
                    body: [httpRequest.body, httpRequest.body.address]
                });
                if (missingFields.length > 0) {
                    return sign_up_controller_helpers_1.badRequest({}, '', new sign_up_controller_helpers_1.MissingParamError(missingFields.join(' ')));
                }
                const _c = Object.assign({}, httpRequest.body, httpRequest.body.address), { address } = _c, checkTheTypeOfThis = __rest(_c, ["address"]);
                const theTypeOfThisIsValid = await this.validation.validate({
                    type: 'verify types',
                    checkThisType: 'string',
                    checkTheTypeOfThis: checkTheTypeOfThis
                });
                if (!theTypeOfThisIsValid.every((verify) => verify)) {
                    return sign_up_controller_helpers_1.badRequest({}, '', new sign_up_controller_helpers_1.InvalidParamError());
                }
                const { password, passwordConfirmation } = httpRequest.body;
                const isEqual = await this.validation.validate({
                    type: 'compare fields',
                    checkThis: password,
                    withThis: passwordConfirmation
                });
                if (!isEqual) {
                    return sign_up_controller_helpers_1.badRequest({}, '', new sign_up_controller_helpers_1.InvalidParamError('passwordConfirmation'));
                }
                const invalidFields = await this.validation.validate({
                    type: 'validate fields',
                    fields: [sign_up_controller_helpers_1.signUpHttpRequestBodyFields, sign_up_controller_helpers_1.signUpHttpRequestBodyAddressFields],
                    body: [httpRequest.body, httpRequest.body.address]
                });
                if (invalidFields.length > 0) {
                    return sign_up_controller_helpers_1.badRequest({}, '', new sign_up_controller_helpers_1.InvalidParamError(invalidFields.join(' ')), invalidFields);
                }
                const { email } = httpRequest.body;
                this.account = await this.readAccount.searchByField({ email: email });
                if ((_b = this.account) === null || _b === void 0 ? void 0 : _b.enabled) {
                    return sign_up_controller_helpers_1.unprocessable();
                }
                const { name } = httpRequest.body;
                this.account = await this.writeAccount.add({
                    name: name,
                    email: email,
                    password: password,
                    passwordConfirmation: passwordConfirmation,
                    address: address,
                    enabled: false
                });
                const { id } = this.account;
                await this.handleEmail(id, name, email);
                return sign_up_controller_helpers_1.accepted();
            }
        }
        catch (error) {
            return sign_up_controller_helpers_1.serverError(error);
        }
    }
    async handleEmail(signUpConfirmationId, name, email) {
        await this.emailSender.signUpConfirmation(signUpConfirmationId, name, email);
    }
}
exports.SignUpController = SignUpController;
//# sourceMappingURL=sign-up-controller.js.map