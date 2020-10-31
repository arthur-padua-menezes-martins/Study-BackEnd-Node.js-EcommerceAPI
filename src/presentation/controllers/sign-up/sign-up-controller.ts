import { Controller, IHttpRequest, IHttpResponse, IAddAccount } from './sign-up-controller-protocols'
import { ValidationComposite } from './sign-up-controller-components'
import {
  MissingParamError, InvalidParamError,
  ok, badRequest, serverError,
  signUpHttpRequestBodyFields, signUpHttpRequestBodyAddressFields
} from './sign-up-controller-helpers'

/**
* @method handle
* validates the insertion of a new account in the database
*/
export class SignUpController implements Controller {
  private readonly addAccount
  private readonly validation

  /**
  * @param { IAddAccount } addAccount
  * implementation of the user account record manager in the database contained
  * @param { ValidationComposite } validation
  * implementation of the validation
  */
  constructor (addAccount: IAddAccount, validation: ValidationComposite) {
    this.addAccount = addAccount
    this.validation = validation
  }

  /**
  * @param { IHttpRequest } httpRequest
  * information by the user
  */
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const missingFields: string[] = await this.validation.validate({
        type: 'required fields',
        fields: [signUpHttpRequestBodyFields, signUpHttpRequestBodyAddressFields],
        body: [httpRequest.body, httpRequest.body.address]
      })
      if (missingFields.length > 0) {
        return badRequest({}, '', new MissingParamError(missingFields.join(' ')))
      }

      const { address, ...checkTheTypeOfThis } = Object.assign({}, httpRequest.body, httpRequest.body.address)
      const theTypeOfThisIsValid = await this.validation.validate({
        type: 'verify types',
        checkThisType: 'string',
        checkTheTypeOfThis: checkTheTypeOfThis
      })
      if (!theTypeOfThisIsValid.every((verify: boolean) => verify)) {
        return badRequest({}, '', new InvalidParamError())
      }

      const { password, passwordConfirmation } = httpRequest.body
      const isEqual = await this.validation.validate({
        type: 'compare fields',
        checkThis: password,
        withThis: passwordConfirmation
      })
      if (!isEqual) {
        return badRequest({}, '', new InvalidParamError('passwordConfirmation'))
      }

      const invalidFields = await this.validation.validate({
        type: 'validate fields',
        fields: [signUpHttpRequestBodyFields, signUpHttpRequestBodyAddressFields],
        body: [httpRequest.body, httpRequest.body.address as object]
      })
      if (invalidFields.length > 0) {
        return badRequest({}, '', new InvalidParamError(invalidFields.join(' ')), invalidFields)
      }

      const { name, email } = httpRequest.body
      const newAccount = await this.addAccount.add({
        name: name as string,
        email: email as string,
        password: password as string,
        passwordConfirmation: passwordConfirmation as string,
        address: address as any
      })

      return ok(newAccount)
    } catch (error) {
      return serverError(error)
    }
  }
}
