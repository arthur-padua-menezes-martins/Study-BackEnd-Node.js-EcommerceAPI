import { Controller, IHttpRequest, IHttpResponse } from './sign-in-protocols'
import { ValidationComposite, Authentication } from './sign-in-components'
import {
  MissingParamError, InvalidParamError, ok, badRequest, unauthorized, serverError,
  signInHttpRequestBodyFields
} from './sign-in-helpers'

/**
* @implements {Controller}
*
* @method `handle`
* validates the user entries for apply the sign in
*/
export class SignInController implements Controller {
  private readonly validation
  private readonly authentication

  /**
  * @param { FieldValidationWithRegex } fieldValidationWithRegex
  * implementation of the request field validator
  */
  constructor (authentication: Authentication, validation: ValidationComposite) {
    this.validation = validation
    this.authentication = authentication
  }

  /**
  * @param { IHttpRequest } httpRequest
  * information by the user
  */
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const missingFields: string[] = await this.validation.validate({
        type: 'required fields',
        fields: signInHttpRequestBodyFields,
        body: httpRequest.body
      })
      if (missingFields.length > 0) {
        return badRequest({}, '', new MissingParamError(missingFields.join(' ')))
      }

      const theTypeOfThisIsValid = await this.validation.validate({
        type: 'verify types',
        checkThisType: 'string',
        checkTheTypeOfThis: httpRequest.body
      })
      if (!theTypeOfThisIsValid.every((verify: boolean) => verify)) {
        return badRequest({}, '', new InvalidParamError())
      }

      const invalidFields = await this.validation.validate({
        type: 'validate fields',
        fields: signInHttpRequestBodyFields,
        body: httpRequest.body
      })
      if (invalidFields.length > 0) {
        return badRequest({}, '', new InvalidParamError(invalidFields.join(' ')), invalidFields)
      }

      const { email, password } = httpRequest.body
      const authorization = await this.authentication.auth({
        email: email as string,
        password: password as string
      })

      if (!authorization) {
        return unauthorized()
      }

      return ok({
        accessToken: authorization
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
