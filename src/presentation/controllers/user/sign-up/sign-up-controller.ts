import {
  IController, IHttpRequest,
  IValidation,
  ISearchAccountByField,
  IAddAccount, IAddAccountModel,
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
  private readonly validate: any = {}
  private account: IAddAccountModel | null = null

  /**
  * @param {ValidationComposite} validationComposite
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

  }

  async handle (httpRequest: IHttpRequest): Promise<any> {
    try {
      const { address, ...body } = Object.assign({}, httpRequest.body)
      this.validate.fields = signUpHttpRequestBodyFields.concat(signUpHttpRequestBodyAddressFields)
      this.validate.body = Object.assign({}, body, address)

      if (httpRequest.query.id) {
        await this.updateAccount.updateEnabled(httpRequest.query.id, true)
        this.account = await this.readAccount.searchByField({ id: httpRequest.query.id })

        if (this.account?.enabled) {
          return created()
        }

        return unprocessable()
      } else {
        const missingFields: string[] = await this.handleValidate({ type: 'required fields' })
        if (missingFields.length > 0) {
          return badRequest({}, '', new MissingParamError(missingFields.join(' ')), missingFields)
        }

        const theTypeOfThisIsValid: boolean[] = await this.handleValidate({ type: 'verify types' })
        if (!theTypeOfThisIsValid.every((verify: boolean) => verify)) {
          return badRequest({}, '', new InvalidParamError())
        }

        const { password, passwordConfirmation } = httpRequest.body
        const isEqual: boolean = await this.handleValidate({ type: 'compare fields' })
        if (!isEqual) {
          return badRequest({}, '', new InvalidParamError('passwordConfirmation'))
        }

        const invalidFields: string[] = await this.handleValidate({ type: 'validate fields' })
        if (invalidFields.length > 0) {
          return badRequest({}, '', new InvalidParamError(invalidFields.join(' ')), invalidFields)
        }

        const { email } = httpRequest.body
        this.account = await this.readAccount.searchByField({ email: email as string })
        if (this.account?.enabled) {
          return unprocessable()
        }

        const { name } = httpRequest.body
        this.account = await this.writeAccount.add({
          name: name as string,
          email: email as string,
          password: password as string,
          passwordConfirmation: passwordConfirmation as string,
          address: {
            cep: address?.cep as string,
            city: address?.city as string,
            neighborhood: address?.neighborhood as string,
            number: address?.number as string,
            state: address?.state as string,
            street: address?.street as string
          },
          enabled: false
        })

        const { id } = this.account
        await this.handleSendEmail(id as string, name as string, email as string)

        return accepted()
      }
    } catch (error) {
      return serverError(error)
    }
  }

  async handleValidate (content: {type: string}): Promise<any> {
    return await this.validationComposite.validate({
      type: content.type,
      fields: this.validate.fields,
      body: this.validate.body,
      checkThis: this.validate.body.password,
      withThis: this.validate.body.passwordConfirmation,
      checkThisType: 'string',
      checkTheTypeOfThis: this.validate.body
    })
  }

  async handleSendEmail (signUpConfirmationId: string, name: string, email: string): Promise<void> {
    await this.emailSender.signUpConfirmation(signUpConfirmationId, name, email)
  }
}
