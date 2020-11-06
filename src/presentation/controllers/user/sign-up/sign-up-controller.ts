import {
  IController, IHttpRequest,
  IValidation,
  ISearchAccountByField,
  IAddAccount, IAccountModel,
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
  public readonly content: {
    fields: string[]
    checkThisType: string
  } = {
    fields: [],
    checkThisType: ''
  }

  private account: IAccountModel | null = null

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
    private readonly readAccount: ISearchAccountByField,
    private readonly writeAccount: IAddAccount,
    private readonly updateAccount: IUpdateEnabledAccount,
    private readonly emailSender: ISendEmailSignUp
  ) {
    Object.defineProperties(this.content, {
      fields: {
        value: signUpHttpRequestBodyFields.concat(signUpHttpRequestBodyAddressFields),
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

  async handle (httpRequest: IHttpRequest): Promise<any> {
    try {
      if (!httpRequest.body?.user?.informations && httpRequest.query?.id) {
        const { id } = httpRequest.query

        await this.updateAccount.updateEnabled(id, true)
        this.account = await this.readAccount.searchByField({ id: id })

        if (this.account?.enabled) {
          return created()
        }

        return unprocessable()
      } else {
        const { body } = await this.defineProperties(httpRequest)
        const handleValidate = await this.handleValidate(body)

        const missingFields: string[] = await handleValidate({ type: 'required fields' })
        if (missingFields.length > 0) {
          return badRequest({}, '', new MissingParamError(missingFields.join(' ')), missingFields)
        }

        const theTypeOfThisIsValid: boolean[] = await handleValidate({ type: 'verify types' })
        if (!theTypeOfThisIsValid.every((verify: boolean) => verify)) {
          return badRequest({}, '', new InvalidParamError())
        }

        const isEqual: boolean = await handleValidate({ type: 'compare fields' })
        if (!isEqual) {
          return badRequest({}, '', new InvalidParamError('passwordConfirmation'))
        }

        const invalidFields: string[] = await handleValidate({ type: 'validate fields' })
        if (invalidFields.length > 0) {
          return badRequest({}, '', new InvalidParamError(invalidFields.join(' ')), invalidFields)
        }

        this.account = await this.readAccount.searchByField({ email: body.personal.email })
        if (this.account?.enabled) {
          return unprocessable()
        }

        this.account = await this.writeAccount.add({
          personal: body.personal,
          address: body.address
        })

        await this.handleSendEmail(this.account.id, body.personal.name, body.personal.email)

        return accepted()
      }
    } catch (error) {
      return serverError(error)
    }
  }

  async handleValidate (body: any): Promise<Function> {
    return async (content: { type: string }) => {
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
  }

  async handleSendEmail (signUpConfirmationId: string, name: string, email: string): Promise<void> {
    await this.emailSender.signUpConfirmation(signUpConfirmationId, name, email)
  }

  async defineProperties (httpRequest: IHttpRequest): Promise<{
    body: IHttpRequest['body']['user']['informations']
  }> {
    const { body: { user: { informations: { address, personal } } } } = Object.assign({}, httpRequest)

    return {
      body: Object.assign({}, { personal: personal }, { address: address }) || {}
    }
  }
}
