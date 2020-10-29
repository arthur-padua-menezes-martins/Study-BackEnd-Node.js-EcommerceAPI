import { SignUpController } from './sign-up'
import { IHttpRequest, IAddAccount, IAddAccountModel, IAccountModel } from './sign-up-protocols'
import { FieldValidationWithRegex, NameValidatorAdapter, EmailValidatorAdapter, PasswordValidatorAdapter } from './sign-up-components'
import {
  MissingParamError, InvalidParamError, badRequest,
  signUpHttpRequestBodyFields, signUpHttpRequestBodyAddressFields, signUpHttpRequestBodyMatchComplete, signUpHttpRequestBodyNotMatch, signUpHttpRequestBodyMissingField, signUpHttpRequestBodyInvalidPasswordConfirmation
} from './sign-up-helpers'

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

const makeFieldValidationWithRegex = async (): Promise<FieldValidationWithRegex> => {
  return new FieldValidationWithRegex({
    name: (new NameValidatorAdapter()).isValid,
    email: (new EmailValidatorAdapter()).isValid,
    password: (new PasswordValidatorAdapter()).isValid
  })
}

interface ISignUpControllerTypes {
  systemUnderTest: SignUpController
  addAccountStub: IAddAccount
  fieldValidationWithRegex: FieldValidationWithRegex
}
const makeSystemUnderTest = async (): Promise<ISignUpControllerTypes> => {
  const addAccountStub = await makeAddAccount()
  const fieldValidationWithRegex = await makeFieldValidationWithRegex()
  const systemUnderTest = new SignUpController(addAccountStub, fieldValidationWithRegex)

  return {
    systemUnderTest,
    addAccountStub,
    fieldValidationWithRegex
  }
}

describe('SignUpController', () => {
  test('returns from httpResponse: "{statusCode: 400}" if any required fields belonging to httpRequestBody do not exist <version 0.0.3>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    var missingFields: string = ''

    const httpRequest: IHttpRequest = {
      body: signUpHttpRequestBodyMissingField
    }

    missingFields = missingFields.missingFields(signUpHttpRequestBodyFields, httpRequest.body)
    missingFields = missingFields.missingFields(signUpHttpRequestBodyAddressFields, httpRequest.body.address as object)

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest({}, '', new MissingParamError(missingFields)))
  })

  test('returns from httpResponse "{status Code: 400}" if the password confirmation does not match the password <version 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const httpRequest: IHttpRequest = {
      body: signUpHttpRequestBodyInvalidPasswordConfirmation
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest({}, '', new InvalidParamError('passwordConfirmation')))
  })

  test('returns from httpResponse "{status Code: 400}" if any fields do not match validation <version 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    const httpRequest: IHttpRequest = {
      body: signUpHttpRequestBodyNotMatch
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe((badRequest({}, '', null)).statusCode)
  })

  test('returns from httpResponse "{status Code: 500}" if sending data to validate any field generates an error <version 0.0.1>', async () => {
    const { systemUnderTest, fieldValidationWithRegex } = await makeSystemUnderTest()
    jest.spyOn(fieldValidationWithRegex, 'exec').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest: IHttpRequest = {
      body: signUpHttpRequestBodyNotMatch
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.errorMessage?.name).toBe('ServerError')
  })

  test('returns from httpResponse "{status Code: 500}" if validating any field throw an error <version 0.0.1>', async () => {
    const { systemUnderTest, fieldValidationWithRegex } = await makeSystemUnderTest()
    jest.spyOn(fieldValidationWithRegex, 'options').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest: IHttpRequest = {
      body: signUpHttpRequestBodyNotMatch
    }

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

  test('returns from httpResponse "{status Code: 500}" if AddAccount throw error <version 0.0.1>', async () => {
    const { systemUnderTest, addAccountStub } = await makeSystemUnderTest()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest: IHttpRequest = {
      body: signUpHttpRequestBodyMatchComplete
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.errorMessage?.name).toBe('ServerError')
  })

  test('returns from httpResponse "{status Code: 200}" if valid information is sent to AddAccount <version 0.0.2>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    const httpRequest: IHttpRequest = {
      body: signUpHttpRequestBodyMatchComplete
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: '',
      ...signUpHttpRequestBodyMatchComplete
    })
  })
})
