import {
  IController, IHttpRequest, IHttpResponse,
  IValidation,
  IAddAccount,
  IUpdateEnabledAccount,
  ISendEmailSignUp
} from './sign-up-controller-protocols'
import {
  MissingParamError, InvalidParamError,
  created, accepted, badRequest, unprocessable, serverError,
  signUpHttpRequestBodyFields, signUpHttpRequestBodyAddressFields
} from './sign-up-controller-helpers'

/**
* @method handle
* validates the insertion of a new account in the database
*/
export class SignUpController implements IController {
  public handleValidate: Function

  public generateTypes: Generator<string>

  public content: {
    fields: string[]
    checkThisType: string
    validationTypes: string[]
  } = {
    fields: signUpHttpRequestBodyFields.concat(signUpHttpRequestBodyAddressFields),
    checkThisType: 'string',
    validationTypes: ['required fields', 'verify types', 'compare fields', 'validate fields']
  }

  /**
  * @param {IValidation} validationComposite
  * implementation of the validation
  * @param {ISearchAccountByField} readAccount
  * implementation of the user account search manager
  * @param {IAddAccount} writeAccount
  * implementation of the user account registration manager
  * @param {IUpdateEnabledAccount} updateAccount
  * user account update manager implementation
  * @param {ISendEmailSignUp} emailSender
  * implementation of the email sender
  */
  constructor (
    private readonly validationComposite: IValidation,
    private readonly writeAccount: IAddAccount,
    private readonly updateAccount: IUpdateEnabledAccount,
    private readonly emailSender: ISendEmailSignUp
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      if (!httpRequest.body?.user?.informations && httpRequest.query?.id) {
        const { id } = httpRequest.query
        await this.updateAccount.updateEnabled(id, true)

        return created()
      } else if (httpRequest.body?.user?.informations) {
        let { body, generateTypes, validation } = await this.defineProperties(httpRequest)
        do {
          validation.content = await this.handleValidate({ type: generateTypes.value })

          if (validation.content.length > 0) {
            if (generateTypes.value === this.content.validationTypes[0]) {
              validation.error = badRequest(undefined, undefined, new MissingParamError(validation.content.join(' ')), validation.content)
            } else {
              validation.error = badRequest(undefined, undefined, new InvalidParamError(validation.content.join(' ')), validation.content)
            }

            break
          }

          generateTypes = this.generateTypes.next()
        } while (!(generateTypes.done))

        if (validation.error) {
          return validation.error
        }

        const account = await this.writeAccount.add({
          personal: body.personal,
          address: body.address
        })
        if (!account) {
          return unprocessable()
        }

        await this.handleSendEmail(account.id, body.personal.name, body.personal.email)

        return accepted()
      }

      return unprocessable()
    } catch (error) {
      return serverError(error)
    }
  }

  async handleSendEmail (signUpConfirmationId: string, name: string, email: string): Promise<void> {
    await this.emailSender.signUpConfirmation(signUpConfirmationId, name, email)
  }

  async defineProperties (httpRequest: IHttpRequest): Promise<{
    body: IHttpRequest['body']['user']['informations']
    generateTypes: IteratorResult<string, any>
    validation: {
      content: string[]
      error: IHttpResponse | null
    }
  }> {
    const { address, personal } = httpRequest.body.user.informations
    const body = { personal: personal, address: address }

    this.generateTypes = generateTypes(this.content.validationTypes, 0)
    this.handleValidate = async (content: { type: string }) => {
      return await this.validationComposite.validate({
        type: content.type,
        fields: this.content.fields,
        body: Object.assign({}, { ...body.personal }, { ...body.address }),
        checkThis: body.personal.password,
        withThis: body.personal.passwordConfirmation,
        checkThisType: this.content.checkThisType,
        checkTheTypeOfThis: Object.assign({}, { ...body.personal }, { ...body.address })
      })
    }

    return {
      body: body,
      generateTypes: this.generateTypes.next(),
      validation: {
        content: [],
        error: null
      }
    }

    function * generateTypes (types: string[], index: number): Generator<string> {
      while (index < types.length) {
        yield types[index]
        index++
      }
    }
  }
}
