import { Controller, IHttpRequest, IHttpResponse } from './sign-in-protocols'
import { FieldValidationWithRegex, Authentication } from './sign-in-components'
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
  private readonly fieldValidationWithRegex
  private readonly authentication

  /**
  * @param { FieldValidationWithRegex } fieldValidationWithRegex
  * implementation of the request field validator
  */
  constructor (fieldValidationWithRegex: FieldValidationWithRegex, authentication: Authentication) {
    this.fieldValidationWithRegex = fieldValidationWithRegex
    this.authentication = authentication
  }

  /**
  * @param { IHttpRequest } httpRequest
  * information by the user
  */
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
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
