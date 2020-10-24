import { Controller, IHttpRequest, IHttpResponse, IAddAccount } from './sign-up-protocols'
import { FieldValidationWithRegex } from './sign-up-components'
import {
  MissingParamError, InvalidParamError, ok, badRequest, serverError,
  signUpHttpRequestBodyFields, signUpHttpRequestBodyAddressFields
} from './sign-up-helpers'

/**
* @method handle
* validates the insertion of a new account in the database
*/
export class SignUpController implements Controller {
  private readonly addAccount
  private readonly fieldValidationWithRegex

  /**
  * @param { IAddAccount } addAccount
  * implementation of the user account record manager in the database contained
  * @param { FieldValidationWithRegex } fieldValidationWithRegex
  * implementation of the request field validator
  */
  constructor (addAccount: IAddAccount, fieldValidationWithRegex: FieldValidationWithRegex) {
    this.addAccount = addAccount
    this.fieldValidationWithRegex = fieldValidationWithRegex
  }

  /**
  * @param { IHttpRequest } httpRequest
  * information by the user
  */
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      var missingFields: string = ''
      var typeOfIsNotString: boolean[] = []

      missingFields = missingFields.missingFields(signUpHttpRequestBodyFields, httpRequest.body)
      missingFields = missingFields.missingFields(signUpHttpRequestBodyAddressFields, httpRequest.body.address as object)
      if (missingFields) {
        return badRequest({}, '', new MissingParamError(missingFields))
      }

      typeOfIsNotString.push(typeOfIsNotString.typeOfIsNotString(signUpHttpRequestBodyFields, httpRequest.body))
      typeOfIsNotString.push(typeOfIsNotString.typeOfIsNotString(signUpHttpRequestBodyAddressFields, httpRequest.body.address as object))
      if (typeOfIsNotString.every(isNotString => isNotString)) {
        return badRequest({}, '', new InvalidParamError())
      }

      const { password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest({}, '', new InvalidParamError('passwordConfirmation'))
      }

      const invalidFieldsOne = await this.fieldValidationWithRegex.exec(signUpHttpRequestBodyFields, httpRequest.body)
      const invalidFieldsTwo = await this.fieldValidationWithRegex.exec(signUpHttpRequestBodyAddressFields, httpRequest.body.address as object)
      const invalidFields = [...invalidFieldsOne, ...invalidFieldsTwo]
      if (invalidFields.length > 0) {
        return badRequest({}, '', new InvalidParamError(invalidFields.join(' ')), invalidFields)
      }

      const { name, email, address } = httpRequest.body
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
