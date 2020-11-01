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
exports.SignUpController = void 0;
const sign_up_controller_helpers_1 = require("./sign-up-controller-helpers");
/**
* @method handle
* validates the insertion of a new account in the database
*/
class SignUpController {
    /**
    * @param { IAddAccount } addAccount
    * implementation of the user account record manager in the database contained
    * @param { ValidationComposite } validation
    * implementation of the validation
    */
    constructor(addAccount, validation) {
        this.addAccount = addAccount;
        this.validation = validation;
    }
    /**
    * @param { IHttpRequest } httpRequest
    * information by the user
    */
    async handle(httpRequest) {
        try {
            const missingFields = await this.validation.validate({
                type: 'required fields',
                fields: [sign_up_controller_helpers_1.signUpHttpRequestBodyFields, sign_up_controller_helpers_1.signUpHttpRequestBodyAddressFields],
                body: [httpRequest.body, httpRequest.body.address]
            });
            if (missingFields.length > 0) {
                return sign_up_controller_helpers_1.badRequest({}, '', new sign_up_controller_helpers_1.MissingParamError(missingFields.join(' ')));
            }
            const _a = Object.assign({}, httpRequest.body, httpRequest.body.address), { address } = _a, checkTheTypeOfThis = __rest(_a, ["address"]);
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
            const { name, email } = httpRequest.body;
            const newAccount = await this.addAccount.add({
                name: name,
                email: email,
                password: password,
                passwordConfirmation: passwordConfirmation,
                address: address
            });
            return sign_up_controller_helpers_1.ok(newAccount);
        }
        catch (error) {
            return sign_up_controller_helpers_1.serverError(error);
        }
    }
}
exports.SignUpController = SignUpController;
