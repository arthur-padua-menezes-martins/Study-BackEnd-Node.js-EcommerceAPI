import { SignUpController } from './sign-up'
import { IHttpRequest, IAddAccount, IAddAccountModel, IAccountModel } from './sign-up-protocols'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors/export-all'
import {
  httpRequestBodyFields, httpRequestBodyAddressFields,
  httpRequestBodyNotMatch, httpRequestBodyMissingField, httpRequestBodyInvalidPasswordConfirmation,
  httpRequestBodyMatchComplete
} from '../../../utils/fake-data/httpRequest'

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

interface ISignUpControllerTypes {
  systemUnderTest: SignUpController
  addAccountStub: IAddAccount
}
const makeSignUpController = async (): Promise<ISignUpControllerTypes> => {
  const addAccountStub = await makeAddAccount()
  const systemUnderTest = new SignUpController(addAccountStub)

  return {
    systemUnderTest,
    addAccountStub
  }
}

describe('presentation/controllers/sign-up.spec.ts', () => {
  test('returns from httpResponde "{statusCode: 400}" if any fields do not exist <version 0.0.3>', async () => {
    const { systemUnderTest } = await makeSignUpController()
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
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage).toEqual(new MissingParamError(missingFields))
  })

  test('returns from httpResponse "{status Code: 400}" if the password confirmation does not match the password <version 0.0.1>', async () => {
    const { systemUnderTest } = await makeSignUpController()
    const httpRequest: IHttpRequest = {
      body: httpRequestBodyInvalidPasswordConfirmation
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  test('returns from httpResponse "{status Code: 400}" if any fields do not match <version 0.0.1>', async () => {
    const { systemUnderTest } = await makeSignUpController()

    const httpRequest: IHttpRequest = {
      body: httpRequestBodyNotMatch
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('returns from httpResponse "{status Code: 500}" if validating any field throw an error <version 0.0.1>', async () => {
    const { systemUnderTest } = await makeSignUpController()

    const httpRequest: IHttpRequest = {
      body: {
        ...httpRequestBodyNotMatch,
        name: undefined
      }
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.errorMessage).toEqual(new ServerError())
  })

  test('must call AddAccount with the correct values <version 0.0.1>', async () => {
    const { systemUnderTest, addAccountStub } = await makeSignUpController()
    const spyOnAddAccountStubAdd = await jest.spyOn(addAccountStub, 'add')

    const httpRequest: IHttpRequest = {
      body: httpRequestBodyMatchComplete
    }

    await systemUnderTest.handle(httpRequest)
    expect(spyOnAddAccountStubAdd).toHaveBeenCalledWith(httpRequestBodyMatchComplete)
  })

  test('returns from httpResponse "{status Code: 500}" if AddAccount throw error <version 0.0.1>', async () => {
    const { systemUnderTest, addAccountStub } = await makeSignUpController()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest: IHttpRequest = {
      body: httpRequestBodyMatchComplete
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.errorMessage).toEqual(new ServerError())
  })

  test('returns from httpResponse "{status Code: 200}" if valid information is sent to AddAccount <version 0.0.2>', async () => {
    const { systemUnderTest } = await makeSignUpController()

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
