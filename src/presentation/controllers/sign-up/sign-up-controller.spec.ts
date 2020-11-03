import { SignUpController } from './sign-up-controller'
import {
  IHttpRequest,
  ISearchAccountByField, ISearchAccountByFieldModel,
  IAddAccount, IAddAccountModel, IAccountModel
} from './sign-up-controller-protocols'
import {
  FieldValidationWithRegEx,
  ValidationComposite, RequiredFieldsValidator, VerifyTypesValidator, CompareFieldsValidator, ValidateFieldsValidator,
  NameValidatorAdapter, EmailValidatorAdapter, PasswordValidatorAdapter,
  SendEmailSignUpController
} from './sign-up-controller-components'
import {
  signUpHttpRequestBodyFields, signUpHttpRequestBodyAddressFields, signUpHttpRequestBodyMatchComplete, signUpHttpRequestBodyNotMatch, signUpHttpRequestBodyMissingField, signUpHttpRequestBodyInvalidPasswordConfirmation,
  accountModelMatch
} from './sign-up-controller-helpers'

const makeFieldValidationWithRegEx = async (): Promise<FieldValidationWithRegEx> => {
  return new FieldValidationWithRegEx({
    name: (new NameValidatorAdapter()).isValid,
    email: (new EmailValidatorAdapter()).isValid,
    password: (new PasswordValidatorAdapter()).isValid
  })
}

const makeReadAccount = async (): Promise<ISearchAccountByField> => {
  class ReadAccountStub {
    async searchByField (field: ISearchAccountByFieldModel): Promise<IAccountModel | null> {
      return await Promise.resolve(accountModelMatch)
    }
  }

  return await Promise.resolve(new ReadAccountStub())
}

const makeEmailSender = async (): Promise<SendEmailSignUpController> => {
  return new SendEmailSignUpController()
}

const makeWriteAccount = async (): Promise<IAddAccount> => {
  class WriteAccountStub {
    async add (account: IAddAccountModel): Promise<IAccountModel> {
      return await Promise.resolve({
        id: '',
        ...account
      })
    }
  }

  return await Promise.resolve(new WriteAccountStub())
}

const makeUpdateAccount = async (): Promise<any> => {
  class UpdateAccountStub {
    async updateEnabled (id: string, status: boolean): Promise<any> {
      return ''
    }
  }

  return new UpdateAccountStub()
}

interface ISignUpControllerTypes {
  systemUnderTest: SignUpController
  validationStub: ValidationComposite
  writeAccountStub: IAddAccount
}
const makeSystemUnderTest = async (): Promise<ISignUpControllerTypes> => {
  const validationStub = new ValidationComposite([
    { content: new ValidateFieldsValidator(await makeFieldValidationWithRegEx()), type: 'validate fields' },
    { content: new RequiredFieldsValidator(), type: 'required fields' },
    { content: new VerifyTypesValidator(), type: 'verify types' },
    { content: new CompareFieldsValidator(), type: 'compare fields' }
  ])
  const readAccountStub = await makeReadAccount()
  const writeAccountStub = await makeWriteAccount()
  const updateAccountStub = await makeUpdateAccount()
  const emailSender = await makeEmailSender()
  const systemUnderTest = new SignUpController(validationStub, readAccountStub, writeAccountStub, updateAccountStub, emailSender)

  return {
    systemUnderTest,
    validationStub,
    writeAccountStub
  }
}

const httpRequest: IHttpRequest = {
  body: signUpHttpRequestBodyMatchComplete
}

describe('SignUpController', () => {
  test('returns from httpResponse: "{statusCode: 400}" if any required fields belonging to httpRequestBody do not exist <version 0.0.3>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    httpRequest.body = signUpHttpRequestBodyMissingField

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage?.name).toBe('MissingParamError')
  })

  test('returns from httpResponse "{status Code: 400}" if the password confirmation does not match the password <version 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    httpRequest.body = signUpHttpRequestBodyInvalidPasswordConfirmation

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage?.name).toBe('InvalidParamError')
  })

  test('returns from httpResponse "{status Code: 400}" if any fields do not match validation <version 0.0.1>', async () => {
    const { systemUnderTest, validationStub } = await makeSystemUnderTest()

    httpRequest.body = signUpHttpRequestBodyNotMatch

    const spyOnValidate = jest.spyOn(validationStub, 'validate')

    const httpResponse = await systemUnderTest.handle(httpRequest)

    expect(spyOnValidate).toHaveBeenCalledWith({
      type: 'validate fields',
      fields: [signUpHttpRequestBodyFields, signUpHttpRequestBodyAddressFields],
      body: [httpRequest.body, httpRequest.body.address as object]
    })
    expect(httpResponse.statusCode).toBe(400)
  })

  test('returns from httpResponse "{status Code: 500}" if AddAccount throw error <version 0.0.1>', async () => {
    const { systemUnderTest, writeAccountStub } = await makeSystemUnderTest()
    httpRequest.body = signUpHttpRequestBodyMatchComplete

    jest.spyOn(writeAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.errorMessage?.name).toBe('ServerError')
  })

  test('must call AddAccount with the correct values <version 0.0.1>', async () => {
    const { systemUnderTest, writeAccountStub } = await makeSystemUnderTest()
    const spyOnAddAccountStubAdd = await jest.spyOn(writeAccountStub, 'add')

    await systemUnderTest.handle(httpRequest)
    expect(spyOnAddAccountStubAdd).toHaveBeenCalledWith(signUpHttpRequestBodyMatchComplete)
  })

  test('returns from httpResponse "{status Code: 200}" if valid information is sent to AddAccount <version 0.0.2>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    httpRequest.body = signUpHttpRequestBodyMatchComplete

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })
})
