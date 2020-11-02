import {
  IController, IHttpRequest, IHttpResponse,
  ISearchAccountByField, IAddAccount,
  IAuthentication
} from './sign-up-controller-protocols'
import { ValidationComposite } from './sign-up-controller-components'
import {
  MissingParamError, InvalidParamError,
  ok, badRequest, unprocessable, serverError,
  signUpHttpRequestBodyFields, signUpHttpRequestBodyAddressFields
} from './sign-up-controller-helpers'

/**
* @method handle
* validates the insertion of a new account in the database
*/
export class SignUpController implements IController {
  /**
  * @param {ValidationComposite} validation
  * implementation of the validation
  * @param {ISearchAccountByField} readAccount
  * implementation of the user account search manager
  * @param {IAddAccount} writeAccount
  * implementation of the user account registration manager
  * @param {IAuthentication} authentication
  * implementation of the Authenticator
  */
  constructor (
    private readonly validation: ValidationComposite,
    private readonly readAccount: ISearchAccountByField,
    private readonly writeAccount: IAddAccount,
    private readonly authentication: IAuthentication
  ) {}

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

      const { email } = httpRequest.body
      const existis = await this.readAccount.searchByField({ email: email as string })
      if (existis) {
        return unprocessable()
      }

      const { name } = httpRequest.body
      await this.writeAccount.add({
        name: name as string,
        email: email as string,
        password: password as string,
        passwordConfirmation: passwordConfirmation as string,
        address: address as any
      })

      const authorization = await this.authentication.auth({
        email: email as string,
        password: password as string
      })

      return ok({
        accessToken: authorization
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
