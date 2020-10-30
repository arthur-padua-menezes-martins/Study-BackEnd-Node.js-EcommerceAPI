import { SignInController } from './sign-in'
import { IHttpRequest } from './sign-in-protocols'
import {
  ValidationComposite, RequiredFieldsValidator, VerifyTypesValidator, CompareFieldsValidator, ValidateFieldsValidator,
  FieldValidationWithRegex, EmailValidatorAdapter, PasswordValidatorAdapter
} from './sign-in-components'
import { Authentication } from '../../../domain/usecases/authentication'
import {
  signInHttpRequestBodyFields, signInHttpRequestBodyMatch, signInHttpRequestBodyNotMatch, signInHttpRequestBodyMissingField
} from './sign-in-helpers'

const makeFieldValidationWithRegex = async (): Promise<FieldValidationWithRegex> => {
  return new FieldValidationWithRegex({
    email: (new EmailValidatorAdapter()).isValid,
    password: (new PasswordValidatorAdapter()).isValid
  })
}

interface IAuthInformations {
  email: string
  password: string
}
const makeAuthenticationStub = async (): Promise<Authentication> => {
  class AuthenticationStub implements Authentication {
    async auth (authInformations: IAuthInformations): Promise<string> {
      return 'any_token'
    }
  }

  return new AuthenticationStub()
}

interface ISignUpControllerTypes {
  systemUnderTest: SignInController
  validation: ValidationComposite
  authenticationStub: Authentication
}
const makeSystemUnderTest = async (): Promise<ISignUpControllerTypes> => {
  const validation = new ValidationComposite([
    { content: new ValidateFieldsValidator(await makeFieldValidationWithRegex()), type: 'validate fields' },
    { content: new RequiredFieldsValidator(), type: 'required fields' },
    { content: new VerifyTypesValidator(), type: 'verify types' },
    { content: new CompareFieldsValidator(), type: 'compare fields' }
  ])
  const authenticationStub = await makeAuthenticationStub()
  const systemUnderTest = new SignInController(validation, authenticationStub)

  return {
    systemUnderTest,
    validation,
    authenticationStub
  }
}

describe('SignInController', () => {
  test('returns from httpResponse: "{statusCode: 400}" if any required fields belonging to httpRequest.body do not exist <version 0.0.1>', async () => {
    const { systemUnderTest, validation } = await makeSystemUnderTest()
    const SpyOnValidate = jest.spyOn(validation, 'validate')

    const httpRequest: IHttpRequest = {
      body: signInHttpRequestBodyMissingField
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(SpyOnValidate).toHaveBeenCalledWith(({
      type: 'required fields',
      fields: signInHttpRequestBodyFields,
      body: httpRequest.body
    }))
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage?.name).toBe('MissingParamError')
  })

  test('returns from httpResponse "{status Code: 400}" if any fields do not match validation <version 0.0.1>', async () => {
    const { systemUnderTest, validation } = await makeSystemUnderTest()
    const SpyOnValidate = jest.spyOn(validation, 'validate')

    const httpRequest: IHttpRequest = {
      body: signInHttpRequestBodyNotMatch
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(SpyOnValidate).toHaveBeenLastCalledWith(({
      type: 'validate fields',
      fields: signInHttpRequestBodyFields,
      body: httpRequest.body
    }))
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage?.name).toBe('InvalidParamError')
  })

  test('returns from httpResponse "{status Code: 500}" if sending data to validate any field generates an error <version 0.0.1>', async () => {
    const { systemUnderTest, validation } = await makeSystemUnderTest()
    jest.spyOn(validation, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest: IHttpRequest = {
      body: signInHttpRequestBodyNotMatch
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.errorMessage?.name).toBe('ServerError')
  })

  test('should call Authentication with correct values <version 0.0.1>', async () => {
    const { systemUnderTest, authenticationStub } = await makeSystemUnderTest()
    const spyOnAuth = jest.spyOn(authenticationStub, 'auth')

    const httpRequest: IHttpRequest = {
      body: signInHttpRequestBodyMatch
    }

    await systemUnderTest.handle(httpRequest)
    expect(spyOnAuth).toHaveBeenLastCalledWith(signInHttpRequestBodyMatch)
  })

  test('return from httpResponse "{status: 401}" if invalid credentials are provided <version 0.0.1>', async () => {
    const { systemUnderTest, authenticationStub } = await makeSystemUnderTest()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(''))

    const httpRequest: IHttpRequest = {
      body: signInHttpRequestBodyMatch
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.errorMessage?.name).toBe('UnauthorizedError')
  })

  test('return from httpResponse "{status: 500}" if Authentication throws <version 0.0.1>', async () => {
    const { systemUnderTest, authenticationStub } = await makeSystemUnderTest()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.reject(new Error()))

    const httpRequest: IHttpRequest = {
      body: signInHttpRequestBodyMatch
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.errorMessage?.name).toBe('ServerError')
  })

  test('return from httpResponse "{status: 200}" if valid credentials are provided <version 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    const httpRequest: IHttpRequest = {
      body: signInHttpRequestBodyMatch
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })
})
