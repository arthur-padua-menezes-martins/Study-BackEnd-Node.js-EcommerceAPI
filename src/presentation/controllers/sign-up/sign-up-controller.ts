import {
  IController, IHttpRequest,
  ISearchAccountByField,
  IAddAccount, IAddAccountModel,
  IUpdateEnabledAccount
} from './sign-up-controller-protocols'
import { ValidationComposite } from './sign-up-controller-components'
import {
  MissingParamError, InvalidParamError,
  created, accepted, badRequest, unprocessable, serverError,
  signUpHttpRequestBodyFields, signUpHttpRequestBodyAddressFields
} from './sign-up-controller-helpers'
import { ISendEmailSignUp } from '../../../infra/send/email/sign-up/send-email-sign-up'

/**
* @method handle
* validates the insertion of a new account in the database
*/
export class SignUpController implements IController {
  private account: IAddAccountModel | null = null

  /**
  * @param {ValidationComposite} validation
  * implementation of the validation
  * @param {ISearchAccountByField} readAccount
  * implementation of the user account search manager
  * @param {IAddAccount} writeAccount
  * implementation of the user account registration manager
  * @param {IUpdateEnabledAccount} updateAccount
  * implementation of the user account update enabled status
  * @param {ISendEmailSignUp} emailSender
  * implementation of the email sender
  */
  constructor (
    private readonly validation: ValidationComposite,
    private readonly readAccount: ISearchAccountByField,
    private readonly writeAccount: IAddAccount,
    private readonly updateAccount: IUpdateEnabledAccount,
    private readonly emailSender: ISendEmailSignUp
  ) {

  }

  async handle (httpRequest: IHttpRequest): Promise<any> {
    try {
      if (httpRequest.query.id) {
        await this.updateAccount.updateEnabled(httpRequest.query.id, true)
        this.account = await this.readAccount.searchByField({ id: httpRequest.query.id })

        if (this.account?.enabled) {
          return created()
        }

        return unprocessable()
      } else {
        const missingFields: string[] = await this.validation.validate({
          type: 'required fields',
          fields: [signUpHttpRequestBodyFields, signUpHttpRequestBodyAddressFields],
          body: [httpRequest.body, httpRequest.body.address]
        })
        if (missingFields.length > 0) {
          return badRequest({}, '', new MissingParamError(missingFields.join(' ')))
        }

        const { address, ...checkTheTypeOfThis } = Object.assign({}, httpRequest.body, httpRequest.body.address)
        const theTypeOfThisIsValid: boolean[] = await this.validation.validate({
          type: 'verify types',
          checkThisType: 'string',
          checkTheTypeOfThis: checkTheTypeOfThis
        })
        if (!theTypeOfThisIsValid.every((verify: boolean) => verify)) {
          return badRequest({}, '', new InvalidParamError())
        }

        const { password, passwordConfirmation } = httpRequest.body
        const isEqual: boolean = await this.validation.validate({
          type: 'compare fields',
          checkThis: password,
          withThis: passwordConfirmation
        })
        if (!isEqual) {
          return badRequest({}, '', new InvalidParamError('passwordConfirmation'))
        }

        const invalidFields: string[] = await this.validation.validate({
          type: 'validate fields',
          fields: [signUpHttpRequestBodyFields, signUpHttpRequestBodyAddressFields],
          body: [httpRequest.body, httpRequest.body.address as object]
        })
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
          address: address as any,
          enabled: false
        })

        const { id } = this.account
        await this.handleEmail(id as string, name as string, email as string)

        return accepted()
      }
    } catch (error) {
      return serverError(error)
    }
  }

  async handleEmail (signUpConfirmationId: string, name: string, email: string): Promise<void> {
    await this.emailSender.signUpConfirmation(signUpConfirmationId, name, email)
  }
}
