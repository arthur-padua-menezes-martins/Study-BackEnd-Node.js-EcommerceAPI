import { SignUpController } from './sign-up-controller'
import {
  IHttpRequest,
  IAddAccount, IAddAccountModel, IAccountModel,
  IAuthentication, IAuthenticationModel
} from './sign-up-controller-protocols'
import {
  FieldValidationWithRegEx,
  ValidationComposite, RequiredFieldsValidator, VerifyTypesValidator, CompareFieldsValidator, ValidateFieldsValidator,
  NameValidatorAdapter, EmailValidatorAdapter, PasswordValidatorAdapter
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

const makeAuthenticationStub = async (): Promise<IAuthentication> => {
  class AuthenticationStub implements IAuthentication {
    async auth (authentication: IAuthenticationModel): Promise<string> {
      return await Promise.resolve('any_token')
    }
  }

  return new AuthenticationStub()
}

interface ISignUpControllerTypes {
  systemUnderTest: SignUpController
  addAccountStub: IAddAccount
  validationStub: ValidationComposite
  authenticationStub: IAuthentication
}
const makeSystemUnderTest = async (): Promise<ISignUpControllerTypes> => {
  const addAccountStub = await makeAddAccount()
  const validationStub = new ValidationComposite([
    { content: new ValidateFieldsValidator(await makeFieldValidationWithRegEx()), type: 'validate fields' },
    { content: new RequiredFieldsValidator(), type: 'required fields' },
    { content: new VerifyTypesValidator(), type: 'verify types' },
    { content: new CompareFieldsValidator(), type: 'compare fields' }
  ])
  const authenticationStub = await makeAuthenticationStub()
  const systemUnderTest = new SignUpController(addAccountStub, validationStub, authenticationStub)

  return {
    systemUnderTest,
    addAccountStub,
    validationStub,
    authenticationStub
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
    const { systemUnderTest, addAccountStub } = await makeSystemUnderTest()
    httpRequest.body = signUpHttpRequestBodyMatchComplete

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

    await systemUnderTest.handle(httpRequest)
    expect(spyOnAddAccountStubAdd).toHaveBeenCalledWith(signUpHttpRequestBodyMatchComplete)
  })

  test('should call Authentication with correct values <version 0.0.1>', async () => {
    const { systemUnderTest, authenticationStub } = await makeSystemUnderTest()
    const spyOnAuth = jest.spyOn(authenticationStub, 'auth')

    await systemUnderTest.handle(httpRequest)
    expect(spyOnAuth).toHaveBeenLastCalledWith({
      email: httpRequest.body.email,
      password: httpRequest.body.password
    })
  })

  test('return from httpResponse "{status: 500}" if Authentication throws <version 0.0.1>', async () => {
    const { systemUnderTest, authenticationStub } = await makeSystemUnderTest()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.reject(new Error()))

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.errorMessage?.name).toBe('ServerError')
  })

  test('returns from httpResponse "{status Code: 200}" if valid information is sent to AddAccount <version 0.0.2>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    httpRequest.body = signUpHttpRequestBodyMatchComplete

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })
})
