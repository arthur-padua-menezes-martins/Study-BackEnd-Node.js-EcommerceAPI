import { Controller, IHttpRequest, IHttpResponse } from './sign-in-controller-protocols'
import { ValidationComposite, Authentication } from './sign-in-controller-components'
import {
  MissingParamError, InvalidParamError,
  ok, badRequest, unauthorized, serverError,
  signInHttpRequestBodyFields
} from './sign-in-controller-helpers'

/**
* @implements {Controller}
*
* @method `handle`
* validates the user entries for apply the sign in
*/
export class SignInController implements Controller {
  /**
  * @param { Authentication } authentication
  * implementation of the Authenticator
  * @param { ValidationComposite } validation
  * implementation of the Validator
  */
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: ValidationComposite
  ) {}

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
