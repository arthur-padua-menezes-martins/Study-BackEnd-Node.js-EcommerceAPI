import { Controller, IHttpRequest, IHttpResponse, IAddAccount } from './sign-up-protocols'
import { FieldValidationWithRegex } from '../../regEx/field-validation'
import { MissingParamError, InvalidParamError } from '../../errors/export-all'
import {
  ok, badRequest, serverError,
  signUpHttpRequestBodyFields, signUpHttpRequestBodyAddressFields
} from '../../helpers/export-all'
import '../../../main/prototype'

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

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      var missingFields: string = ''
      var typeOfIsNotString: boolean[] = []

      missingFields = missingFields.missingFields(signUpHttpRequestBodyFields, httpRequest.body)
      missingFields = missingFields.missingFields(signUpHttpRequestBodyAddressFields, httpRequest.body.address as object)
      typeOfIsNotString.push(typeOfIsNotString.typeOfIsNotString(signUpHttpRequestBodyAddressFields, httpRequest.body))
      typeOfIsNotString.push(typeOfIsNotString.typeOfIsNotString(signUpHttpRequestBodyAddressFields, httpRequest.body.address as object))

      if (missingFields) {
        return badRequest({}, '', new MissingParamError(missingFields))
      }

      if (typeOfIsNotString.every(isNotString => Boolean(isNotString))) {
        return badRequest({}, '', new InvalidParamError())
      }

      const { password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest({}, '', new InvalidParamError('passwordConfirmation'))
      }

      var invalidFields: string[] = []
      for (const field of signUpHttpRequestBodyFields) {
        invalidFields.push(await this.fieldValidationWithRegex.options(field, httpRequest.body[field]))
      }
      for (const field of signUpHttpRequestBodyAddressFields) {
        invalidFields.push(await this.fieldValidationWithRegex.options(field, httpRequest.body[field]))
      }
      invalidFields = (invalidFields.filter(field => field !== ''))
      if (invalidFields.length > 0) {
        return badRequest({}, '', null, invalidFields)
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
