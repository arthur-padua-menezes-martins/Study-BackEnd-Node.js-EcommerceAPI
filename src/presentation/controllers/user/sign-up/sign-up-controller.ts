import {
  IController,
  IHttpRequest, IHttpResponse,
  IValidation,
  IAddAccount,
  IUpdateEnabledAccount,
  ISendEmailSignUp,
  IDefineProperties
} from './sign-up-controller-protocols'
import {
  SuperClassSignInAndSignUpController
} from './sign-up-controller-components'
import {
  MissingParamError, InvalidParamError
} from './sign-up-controller-errors'
import {
  created, accepted, badRequest, unprocessable, serverError
} from './sign-up-controller-helpers'
import {
  informationsOfSignUpHttpRequest
} from './sign-up-controller-utils'

/**
* @method handle
* validates the insertion of a new account in the database
*/
export class SignUpController extends SuperClassSignInAndSignUpController implements IController {
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
  ) {
    super()

    this.content = {
      fields: informationsOfSignUpHttpRequest.bodyFields,
      checkThisType: 'string',
      validationTypes: ['required_fields', 'verify_types', 'compare_fields', 'validate_fields']
    }
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      if (!httpRequest.body?.user?.informations && httpRequest.query?.id) {
        const { id } = httpRequest.query
        await this.updateAccount.updateEnabled(id, true)

        return created()
      } else if (httpRequest.body?.user?.informations) {
        let { personal, address, generateTypes, generatedType, validation } = await this.defineProperties(httpRequest)

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

        const account = await this.writeAccount.add({
          personal: personal,
          address: address
        })
        if (!account) {
          return unprocessable()
        }

        await this.handleSendEmail(account.id, personal.name, personal.email)

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

  async defineProperties (httpRequest: IHttpRequest): Promise<IDefineProperties> {
    const { address, personal } = httpRequest.body.user.informations
    const generateTypes: Generator<string> = (this.generateTypes(this.content.validationTypes, 0))()

    this.handleValidate = async (content: { type: string }) => {
      return await this.validationComposite.validate({
        type: content.type,
        fields: this.content.fields,
        body: Object.assign({}, { ...personal }, { ...address }),
        checkThis: personal.password,
        withThis: personal.passwordConfirmation,
        checkThisType: this.content.checkThisType,
        checkTheTypeOfThis: Object.assign({}, { ...personal }, { ...address })
      })
    }

    return {
      personal,
      address,
      generateTypes: generateTypes,
      generatedType: generateTypes.next(),
      validation: {
        content: [],
        error: null
      }
    }
  }
}
