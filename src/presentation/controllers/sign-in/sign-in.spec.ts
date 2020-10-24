import { SignInController } from './sign-in'
import { IHttpRequest } from './sign-in-protocols'
import { MissingParamError } from '../../errors/export-all'
import {
  badRequest,
  signInHttpRequestBodyFields,
  signInHttpRequestBodyMissingField
} from '../../helpers/export-all'
import '../../../main/prototype'

interface ISignUpControllerTypes {
  systemUnderTest: SignInController
}
const makeSystemUnderTest = (): ISignUpControllerTypes => {
  const systemUnderTest = new SignInController()

  return {
    systemUnderTest
  }
}

describe('SignInController', () => {
  test('returns from httpResponse: "{statusCode: 400}" if any required fields belonging to httpRequest.body do not exist <version 0.0.1>', async () => {
    const { systemUnderTest } = makeSystemUnderTest()
    var missingFields: string = ''

    const httpRequest: IHttpRequest = {
      body: signInHttpRequestBodyMissingField
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest({}, '', new MissingParamError(
      missingFields.missingFields(signInHttpRequestBodyFields, httpRequest.body)
    )))
  })
})
