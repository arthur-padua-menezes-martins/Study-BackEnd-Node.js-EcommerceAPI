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
  public readonly content: {
    fields: string[]
    checkThisType: string
  } = {
    fields: [],
    checkThisType: ''
  }

  /**
  * @param {IValidation} validationComposite
  * implementation of the validation
  * @param {IAuthentication} authentication
  * implementation of the Authenticator
  */
  constructor (
    private readonly validationComposite: IValidation,
    private readonly authentication: IAuthentication
  ) {
    Object.defineProperties(this.content, {
      fields: {
        value: signInHttpRequestBodyFields,
        enumerable: true,
        writable: false,
        configurable: false
      },
      checkThisType: {
        value: 'string',
        enumerable: true,
        writable: false,
        configurable: false
      }
    })
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { personal } = await this.defineProperties(httpRequest)
      const handleValidate = await this.handleValidate(personal)

      const missingFields: string[] = await handleValidate({ type: 'required fields' })
      if (missingFields.length > 0) {
        return badRequest({}, '', new MissingParamError(missingFields.join(' ')))
      }

      const theTypeOfThisIsValid: boolean[] = await handleValidate({ type: 'verify types' })
      if (!theTypeOfThisIsValid.every((verify: boolean) => verify)) {
        return badRequest({}, '', new InvalidParamError())
      }

      const invalidFields: string[] = await handleValidate({ type: 'validate fields' })
      if (invalidFields.length > 0) {
        return badRequest({}, '', new InvalidParamError(invalidFields.join(' ')), invalidFields)
      }

      const authorization = await this.authentication.auth({
        email: personal.email,
        password: personal.password
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

  async handleValidate (body: any): Promise<Function> {
    return async (content: {type: string}) => {
      return await this.validationComposite.validate({
        type: content.type,
        fields: this.content.fields,
        body: body,
        checkThisType: this.content.checkThisType,
        checkTheTypeOfThis: body
      })
    }
  }

  async defineProperties (httpRequest: IHttpRequest): Promise<{
    personal: IHttpRequest['body']['user']['informations']['personal']
  }> {
    const { body: { user: { informations: { personal } } } } = httpRequest

    return {
      personal
    }
  }
}
