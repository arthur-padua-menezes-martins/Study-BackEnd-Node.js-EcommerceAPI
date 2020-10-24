import { SignInController } from './sign-in'
import { IHttpRequest } from './sign-in-protocols'
import { FieldValidationWithRegex, EmailValidatorAdapter, PasswordValidatorAdapter } from './sign-in-components'
import {
  MissingParamError, badRequest,
  signInHttpRequestBodyFields, signInHttpRequestBodyNotMatch, signInHttpRequestBodyMissingField
} from './sign-in-helpers'

const makeFieldValidationWithRegex = async (): Promise<FieldValidationWithRegex> => {
  return new FieldValidationWithRegex({
    email: (new EmailValidatorAdapter()).isValid,
    password: (new PasswordValidatorAdapter()).isValid
  })
}

interface ISignUpControllerTypes {
  systemUnderTest: SignInController
  fieldValidationWithRegex: FieldValidationWithRegex
}
const makeSystemUnderTest = async (): Promise<ISignUpControllerTypes> => {
  const fieldValidationWithRegex = await makeFieldValidationWithRegex()
  const systemUnderTest = new SignInController(fieldValidationWithRegex)

  return {
    systemUnderTest,
    fieldValidationWithRegex
  }
}

describe('SignInController', () => {
  test('returns from httpResponse: "{statusCode: 400}" if any required fields belonging to httpRequest.body do not exist <version 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    var missingFields: string = ''

    const httpRequest: IHttpRequest = {
      body: signInHttpRequestBodyMissingField
    }

    missingFields = missingFields.missingFields(signInHttpRequestBodyFields, httpRequest.body)

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest({}, '', new MissingParamError(missingFields)))
  })

  test('returns from httpResponse "{status Code: 400}" if any fields do not match validation <version 0.0.1>', async () => {
    const { systemUnderTest, fieldValidationWithRegex } = await makeSystemUnderTest()
    const SpyOnExec = jest.spyOn(fieldValidationWithRegex, 'exec')

    const httpRequest: IHttpRequest = {
      body: signInHttpRequestBodyNotMatch
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(SpyOnExec).toHaveBeenLastCalledWith(signInHttpRequestBodyFields, signInHttpRequestBodyNotMatch)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage?.name).toBe('InvalidParamError')
  })
})
