import { SignUpController } from './sign-up'
import { IHttpRequest, IAddAccount, IAddAccountModel, IAccountModel } from './sign-up-protocols'
import { badRequest, serverError } from '../../helpers/export-all'
import { FieldValidationWithRegex } from '../../regEx/field-validation'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors/export-all'
import {
  httpRequestBodyFields, httpRequestBodyAddressFields,
  httpRequestBodyNotMatch, httpRequestBodyMissingField, httpRequestBodyInvalidPasswordConfirmation,
  httpRequestBodyMatchComplete
} from '../../../utils/fake-data/httpRequest'
import { NameValidatorAdapter, EmailValidatorAdapter, PasswordValidatorAdapter } from '../../../utils/validation/export-all'

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
}
const makeSystemUnderTest = async (): Promise<ISignUpControllerTypes> => {
  const addAccountStub = await makeAddAccount()
  const fieldValidationWithRegex = await makeFieldValidationWithRegex()
  const systemUnderTest = new SignUpController(addAccountStub, fieldValidationWithRegex)

  return {
    systemUnderTest,
    addAccountStub
  }
}

describe('presentation/controllers/sign-up.spec.ts', () => {
  test('returns from httpResponse "{statusCode: 400}" if any fields do not exist <version 0.0.3>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    var missingFields: string = ''

    const httpRequest: IHttpRequest = {
      body: httpRequestBodyMissingField
    }

    for (const field of httpRequestBodyFields) {
      missingFields += !(field in httpRequest.body) ? `${field} ` : ''
    }
    if ('address' in httpRequest.body && httpRequest.body.address !== undefined) {
      for (const addressField of httpRequestBodyAddressFields) {
        missingFields += !(addressField in httpRequest.body.address) ? `${addressField} ` : ''
      }
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest({}, '', new MissingParamError(missingFields)))
  })

  test('returns from httpResponse "{status Code: 400}" if the password confirmation does not match the password <version 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const httpRequest: IHttpRequest = {
      body: httpRequestBodyInvalidPasswordConfirmation
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest({}, '', new InvalidParamError('passwordConfirmation')))
  })

  test('returns from httpResponse "{status Code: 400}" if any fields do not match <version 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    const httpRequest: IHttpRequest = {
      body: httpRequestBodyNotMatch
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe((badRequest({}, '', null)).statusCode)
  })

  test('returns from httpResponse "{status Code: 400}" if validating any field throw an error <version 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    const httpRequest: IHttpRequest = {
      body: {
        ...httpRequestBodyNotMatch,
        name: undefined
      }
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest({}, '', new InvalidParamError()))
  })

  test('must call AddAccount with the correct values <version 0.0.1>', async () => {
    const { systemUnderTest, addAccountStub } = await makeSystemUnderTest()
    const spyOnAddAccountStubAdd = await jest.spyOn(addAccountStub, 'add')

    const httpRequest: IHttpRequest = {
      body: httpRequestBodyMatchComplete
    }

    await systemUnderTest.handle(httpRequest)
    expect(spyOnAddAccountStubAdd).toHaveBeenCalledWith(httpRequestBodyMatchComplete)
  })

  test('returns from httpResponse "{status Code: 500}" if AddAccount throw error <version 0.0.1>', async () => {
    const { systemUnderTest, addAccountStub } = await makeSystemUnderTest()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest: IHttpRequest = {
      body: httpRequestBodyMatchComplete
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(undefined)))
  })

  test('returns from httpResponse "{status Code: 200}" if valid information is sent to AddAccount <version 0.0.2>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    const httpRequest: IHttpRequest = {
      body: httpRequestBodyMatchComplete
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: '',
      ...httpRequestBodyMatchComplete
    })
  })
})
