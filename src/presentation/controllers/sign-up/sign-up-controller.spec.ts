import { SignUpController } from './sign-up-controller'
import { IHttpRequest, IAddAccount, IAddAccountModel, IAccountModel } from './sign-up-controller-protocols'
import {
  ValidationComposite, RequiredFieldsValidator, VerifyTypesValidator, CompareFieldsValidator, ValidateFieldsValidator,
  FieldValidationWithRegEx, NameValidatorAdapter, EmailValidatorAdapter, PasswordValidatorAdapter
} from './sign-up-controller-components'
import {
  signUpHttpRequestBodyFields, signUpHttpRequestBodyAddressFields, signUpHttpRequestBodyMatchComplete, signUpHttpRequestBodyNotMatch, signUpHttpRequestBodyMissingField, signUpHttpRequestBodyInvalidPasswordConfirmation
} from './sign-up-controller-helpers'

const makeAddAccount = async (): Promise<IAddAccount> => {
  class AddAccountStub {
    async add (account: IAddAccountModel): Promise<IAccountModel> {
      return await Promise.resolve({
        id: '',
        ...account
      })
    }
  }

  return await Promise.resolve(new AddAccountStub())
}

const makeFieldValidationWithRegEx = async (): Promise<FieldValidationWithRegEx> => {
  return new FieldValidationWithRegEx({
    name: (new NameValidatorAdapter()).isValid,
    email: (new EmailValidatorAdapter()).isValid,
    password: (new PasswordValidatorAdapter()).isValid
  })
}

interface ISignUpControllerTypes {
  systemUnderTest: SignUpController
  addAccountStub: IAddAccount
  validation: ValidationComposite
}
const makeSystemUnderTest = async (): Promise<ISignUpControllerTypes> => {
  const addAccountStub = await makeAddAccount()
  const validation = new ValidationComposite([
    { content: new ValidateFieldsValidator(await makeFieldValidationWithRegEx()), type: 'validate fields' },
    { content: new RequiredFieldsValidator(), type: 'required fields' },
    { content: new VerifyTypesValidator(), type: 'verify types' },
    { content: new CompareFieldsValidator(), type: 'compare fields' }
  ])
  const systemUnderTest = new SignUpController(addAccountStub, validation)

  return {
    systemUnderTest,
    addAccountStub,
    validation
  }
}

describe('SignUpController', () => {
  test('returns from httpResponse: "{statusCode: 400}" if any required fields belonging to httpRequestBody do not exist <version 0.0.3>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const httpRequest: IHttpRequest = {
      body: signUpHttpRequestBodyMissingField
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage?.name).toBe('MissingParamError')
  })

  test('returns from httpResponse "{status Code: 400}" if the password confirmation does not match the password <version 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const httpRequest: IHttpRequest = {
      body: signUpHttpRequestBodyInvalidPasswordConfirmation
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage?.name).toBe('InvalidParamError')
  })

  test('returns from httpResponse "{status Code: 400}" if any fields do not match validation <version 0.0.1>', async () => {
    const { systemUnderTest, validation } = await makeSystemUnderTest()
    const httpRequest: IHttpRequest = {
      body: signUpHttpRequestBodyNotMatch
    }

    const spyOnValidate = jest.spyOn(validation, 'validate')

    const httpResponse = await systemUnderTest.handle(httpRequest)

    expect(spyOnValidate).toHaveBeenCalledWith({
      type: 'validate fields',
      fields: [signUpHttpRequestBodyFields, signUpHttpRequestBodyAddressFields],
      body: [httpRequest.body, httpRequest.body.address as object]
    })
    expect(httpResponse.statusCode).toBe(400)
  })

  test('returns from httpResponse "{status Code: 500}" if AddAccount throw error <version 0.0.1>', async () => {
    const { systemUnderTest, addAccountStub } = await makeSystemUnderTest()
    const httpRequest: IHttpRequest = {
      body: signUpHttpRequestBodyMatchComplete
    }

    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.errorMessage?.name).toBe('ServerError')
  })

  test('must call AddAccount with the correct values <version 0.0.1>', async () => {
    const { systemUnderTest, addAccountStub } = await makeSystemUnderTest()
    const spyOnAddAccountStubAdd = await jest.spyOn(addAccountStub, 'add')
    const httpRequest: IHttpRequest = {
      body: signUpHttpRequestBodyMatchComplete
    }

    await systemUnderTest.handle(httpRequest)
    expect(spyOnAddAccountStubAdd).toHaveBeenCalledWith(signUpHttpRequestBodyMatchComplete)
  })

  test('returns from httpResponse "{status Code: 200}" if valid information is sent to AddAccount <version 0.0.2>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const httpRequest: IHttpRequest = {
      body: signUpHttpRequestBodyMatchComplete
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })
})
