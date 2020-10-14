import { SignUpController } from './sign-up'
import { IHttpRequest } from './sign-up-protocols'
import { MissingParamError } from '../../errors/export-all'

interface ISignUpControllerTypes {
  systemUnderTest: SignUpController
}
const makeSignUpController = (): ISignUpControllerTypes => {
  const systemUnderTest = new SignUpController()

  return {
    systemUnderTest
  }
}

describe('presentation/controllers/sign-up.spec.ts', () => {
  test('returns from httpResponde "statusCode 400" if any fields do not exist <version 0.0.1>', async () => {
    const { systemUnderTest } = makeSignUpController()

    const expectedHttpRequest: IHttpRequest = {
      body: {
        name: '@test-field-name-valid',
        email: '@test-field-email-valid',
        password: '@test-field-password-valid',
        passwordConfirmation: '@test-field-password-valid'
      }
    }
    const httpRequest: IHttpRequest = {
      body: {
        email: '@test-field-email-valid',
        password: '@test-field-password-valid',
        passwordConfirmation: '@test-field-password-valid'
      }
    }
    const expectedHttpRequestBodyLength = (Object.values(expectedHttpRequest.body)).length
    const httpRequestBodyLength = (Object.values(httpRequest.body)).length

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpRequestBodyLength).not.toBe(expectedHttpRequestBodyLength)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage).toEqual(new MissingParamError())
  })
})
