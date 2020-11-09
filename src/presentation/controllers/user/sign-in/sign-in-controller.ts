import {
  IController, IHttpRequest, IHttpResponse,
  IAuthentication, IValidation
} from './sign-in-controller-protocols'
import {
  SuperClassSignInAndSignUpController
} from '../super/super-class-controller'
import {
  MissingParamError, InvalidParamError,
  ok, badRequest, unauthorized, serverError,
  fakeDataSignInHttpRequestBodyFields
} from './sign-in-controller-helpers'

interface IDefineProperties {
  personal: IHttpRequest['body']['user']['informations']['personal']
  generateTypes: Generator<string, any, unknown>
  generatedType: IteratorResult<string, any>
  validation: {
    content: string[]
    error: IHttpResponse | null
  }
}
/**
* @implements {Controller}
*
* @method `handle`
* validates the user entries for apply the sign in
*/
export class SignInController extends SuperClassSignInAndSignUpController implements IController {
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
    super()

    this.content = {
      fields: fakeDataSignInHttpRequestBodyFields,
      checkThisType: 'string',
      validationTypes: ['required_fields', 'verify_types', 'validate_fields']
    }
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      let { personal, generateTypes, generatedType, validation } = await this.defineProperties(httpRequest)

      do {
        validation.content = await this.handleValidate({ type: generatedType.value })
        if (validation.content.length > 0) {
          if (generatedType.value === this.content.validationTypes[0]) {
            validation.error = badRequest(undefined, undefined, new MissingParamError(validation.content.join(' ')), validation.content)
          } else {
            validation.error = badRequest(undefined, undefined, new InvalidParamError(validation.content.join(' ')), validation.content)
          }

          break
        }

        generatedType = generateTypes.next()
      } while (!(generatedType.done))

      if (validation.error) {
        return validation.error
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

  async defineProperties (httpRequest: IHttpRequest): Promise<IDefineProperties> {
    const { body: { user: { informations: { personal } } } } = httpRequest
    const generateTypes: Generator<string> = (this.generateTypes(this.content.validationTypes, 0))()

    this.handleValidate = async (content: { type: string }) => {
      return await this.validationComposite.validate({
        type: content.type,
        fields: this.content.fields,
        body: personal,
        checkThisType: this.content.checkThisType,
        checkTheTypeOfThis: personal
      })
    }

    return {
      personal,
      generateTypes: generateTypes,
      generatedType: generateTypes.next(),
      validation: {
        content: [],
        error: null
      }
    }
  }
}
