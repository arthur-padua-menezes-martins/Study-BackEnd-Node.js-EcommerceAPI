import {
  IController, IHttpRequest, IHttpResponse,
  IAuthentication, IValidation
} from './sign-in-controller-protocols'
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
export class SignInController implements IController {
  private readonly validate: any = {}

  /**
  * @param { ValidationComposite } validationComposite
  * implementation of the validation
  * @param { IAuthentication } authentication
  * implementation of the Authenticator
  */
  constructor (
    private readonly validationComposite: IValidation,
    private readonly authentication: IAuthentication
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      this.validate.fields = signInHttpRequestBodyFields
      this.validate.body = httpRequest.body
      this.validate.checkThisType = 'string'

      const missingFields: string[] = await this.handleValidate({ type: 'required fields' })
      if (missingFields.length > 0) {
        return badRequest({}, '', new MissingParamError(missingFields.join(' ')))
      }

      const theTypeOfThisIsValid = await this.handleValidate({ type: 'verify types' })
      if (!theTypeOfThisIsValid.every((verify: boolean) => verify)) {
        return badRequest({}, '', new InvalidParamError())
      }

      const invalidFields = await this.handleValidate({ type: 'validate fields' })
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

  async handleValidate (content: {type: string}): Promise<any[]> {
    return await this.validationComposite.validate({
      type: content.type,
      fields: this.validate.fields,
      body: this.validate.body,
      checkThisType: this.validate.checkThisType,
      checkTheTypeOfThis: this.validate.body
    })
  }
}
