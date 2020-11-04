import { SignInController } from './sign-in-controller'
import {
  IHttpRequest, IHttpResponse,
  IAuthentication
} from './sign-in-controller-protocols'
import {
  validationCompositeStub,
  makeAuthenticationAccount
} from './sign-in-controller-make'
import {
  ValidationComposite
} from './sign-in-controller-components'
import {
  signInHttpRequestBodyFields, signInHttpRequestBodyMatchComplete, signInHttpRequestBodyNotMatch, signInHttpRequestBodyMissingField
} from './sign-in-controller-helpers'

interface ISignUpControllerTypes {
  systemUnderTest: SignInController
  validationCompositeStub: ValidationComposite
  authenticationAccountStub: IAuthentication
}
const makeSystemUnderTest = async (): Promise<ISignUpControllerTypes> => {
  const authenticationAccountStub = await makeAuthenticationAccount()
  const systemUnderTest = new SignInController(validationCompositeStub, authenticationAccountStub)

  return {
    systemUnderTest,
    validationCompositeStub,
    authenticationAccountStub
  }
}

const httpRequest: IHttpRequest = {
  body: signInHttpRequestBodyMatchComplete
}
let httpResponse: IHttpResponse = {
  statusCode: null,
  body: null,
  successMessage: null,
  errorMessage: null,
  invalidFields: null
}

describe('SignInController', () => {
  test('returns from httpResponse: "{statusCode: 400}" if any required fields belonging to httpRequest.body do not exist <version 0.0.1>', async () => {
    const { systemUnderTest, validationCompositeStub } = await makeSystemUnderTest()
    const SpyOnValidate = jest.spyOn(validationCompositeStub, 'validate')

    httpRequest.body = signInHttpRequestBodyMissingField

    httpResponse = await systemUnderTest.handle(httpRequest)
    expect(SpyOnValidate).toHaveBeenCalledWith(({
      type: 'required fields',
      fields: signInHttpRequestBodyFields,
      body: httpRequest.body
    }))
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage?.name).toBe('MissingParamError')
  })

  test('returns from httpResponse "{status Code: 400}" if any fields do not match validation <version 0.0.1>', async () => {
    const { systemUnderTest, validationCompositeStub } = await makeSystemUnderTest()
    const SpyOnValidate = jest.spyOn(validationCompositeStub, 'validate')

    httpRequest.body = signInHttpRequestBodyNotMatch

    httpResponse = await systemUnderTest.handle(httpRequest)
    expect(SpyOnValidate).toHaveBeenLastCalledWith(({
      type: 'validate fields',
      fields: signInHttpRequestBodyFields,
      body: httpRequest.body
    }))
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage?.name).toBe('InvalidParamError')
  })

  test('returns from httpResponse "{status Code: 500}" if sending data to validate any field generates an error <version 0.0.1>', async () => {
    const { systemUnderTest, validationCompositeStub } = await makeSystemUnderTest()
    jest.spyOn(validationCompositeStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })

    httpRequest.body = signInHttpRequestBodyNotMatch

    httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.errorMessage?.name).toBe('ServerError')
  })
})
