import { Controller, IHttpRequest, IHttpResponse } from './sign-in-protocols'
import { FieldValidationWithRegex } from './sign-in-components'
import {
  MissingParamError, InvalidParamError, ok, badRequest,
  signInHttpRequestBodyFields
} from './sign-in-helpers'

/**
* @implements {Controller}
*
* @method `handle`
* validates the user entries for apply the sign in
*/
export class SignInController implements Controller {
  private readonly fieldValidationWithRegex

  /**
  * @param { FieldValidationWithRegex } fieldValidationWithRegex
  * implementation of the request field validator
  */
  constructor (fieldValidationWithRegex: FieldValidationWithRegex) {
    this.fieldValidationWithRegex = fieldValidationWithRegex
  }

  /**
  * @param { IHttpRequest } httpRequest
  * information by the user
  */
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    var missingFields: string = ''
    var typeOfIsNotString: boolean[] = []

    missingFields = missingFields.missingFields(signInHttpRequestBodyFields, httpRequest.body)
    if (missingFields) {
      return badRequest({}, '', new MissingParamError(missingFields))
    }

    typeOfIsNotString.push(typeOfIsNotString.typeOfIsNotString(signInHttpRequestBodyFields, httpRequest.body))
    if (typeOfIsNotString.every(isNotString => isNotString)) {
      return badRequest({}, '', new InvalidParamError())
    }

    const invalidFields = await this.fieldValidationWithRegex.exec(signInHttpRequestBodyFields, httpRequest.body)
    if (invalidFields.length > 0) {
      return badRequest({}, '', new InvalidParamError(invalidFields.join(' ')), invalidFields)
    }

    return ok({})
  }
}
