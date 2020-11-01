"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInController = void 0;
const sign_in_controller_helpers_1 = require("./sign-in-controller-helpers");
/**
* @implements {Controller}
*
* @method `handle`
* validates the user entries for apply the sign in
*/
class SignInController {
    /**
    * @param { Authentication } authentication
    * implementation of the Authenticator
    * @param { ValidationComposite } validation
    * implementation of the Validator
    */
    constructor(authentication, validation) {
        this.authentication = authentication;
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
                fields: sign_in_controller_helpers_1.signInHttpRequestBodyFields,
                body: httpRequest.body
            });
            if (missingFields.length > 0) {
                return sign_in_controller_helpers_1.badRequest({}, '', new sign_in_controller_helpers_1.MissingParamError(missingFields.join(' ')));
            }
            const theTypeOfThisIsValid = await this.validation.validate({
                type: 'verify types',
                checkThisType: 'string',
                checkTheTypeOfThis: httpRequest.body
            });
            if (!theTypeOfThisIsValid.every((verify) => verify)) {
                return sign_in_controller_helpers_1.badRequest({}, '', new sign_in_controller_helpers_1.InvalidParamError());
            }
            const invalidFields = await this.validation.validate({
                type: 'validate fields',
                fields: sign_in_controller_helpers_1.signInHttpRequestBodyFields,
                body: httpRequest.body
            });
            if (invalidFields.length > 0) {
                return sign_in_controller_helpers_1.badRequest({}, '', new sign_in_controller_helpers_1.InvalidParamError(invalidFields.join(' ')), invalidFields);
            }
            const { email, password } = httpRequest.body;
            const authorization = await this.authentication.auth({
                email: email,
                password: password
            });
            if (!authorization) {
                return sign_in_controller_helpers_1.unauthorized();
            }
            return sign_in_controller_helpers_1.ok({
                accessToken: authorization
            });
        }
        catch (error) {
            return sign_in_controller_helpers_1.serverError(error);
        }
    }
}
exports.SignInController = SignInController;
//# sourceMappingURL=sign-in-controller.js.map