import { SignUpController } from './sign-up'
import { IHttpRequest } from './sign-up-protocols'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors/export-all'
import {
  httpRequestBodyFields, httpRequestBodyAddressFields,
  httpRequestBodyNotMatch, httpRequestBodyMissingField, httpRequestBodyInvalidPasswordConfirmation
} from '../../helpers/export-all'

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
  test('returns from httpResponde "{statusCode: 400}" if any fields do not exist <version 0.0.3>', async () => {
    const { systemUnderTest } = makeSignUpController()
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

  test('return from httpResponse "{status Code: 400}" if the password confirmation does not match the password <version 0.0.1>', async () => {
    const { systemUnderTest } = makeSignUpController()
    const httpRequest: IHttpRequest = {
      body: httpRequestBodyInvalidPasswordConfirmation
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  test('return from httpResponse "{status Code: 400}" if any fields do not match <version 0.0.1>', async () => {
    const { systemUnderTest } = makeSignUpController()

    const httpRequest: IHttpRequest = {
      body: httpRequestBodyNotMatch
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('return from httpResponse "{status Code: 500}" if validating any field returns an error <version 0.0.1>', async () => {
    const { systemUnderTest } = makeSignUpController()

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
})
