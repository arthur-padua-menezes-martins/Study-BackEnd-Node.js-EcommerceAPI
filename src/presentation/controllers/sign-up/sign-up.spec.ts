import { SignUpController } from './sign-up'
import { IHttpRequest } from './sign-up-protocols'
import { MissingParamError, InvalidParamError } from '../../errors/export-all'

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
    const httpRequestBodyFields: string[] = ['name', 'email', 'password', 'passwordConfirmation']
    const httpRequestBodyAddressFields: string[] = ['cep', 'street', 'number', 'neighborhood', 'city', 'state']
    var MissingFields: string = ''

    const expectedHttpRequest: IHttpRequest = {
      body: {
        name: '@test-field-name-valid',
        email: '@test-field-email-valid',
        password: '@test-field-password-valid',
        passwordConfirmation: '@test-field-password-valid',
        address: {
          cep: '@test-field-cep-valid',
          street: '@test-field-street-valid',
          number: '@test-field-number-valid',
          neighborhood: '@test-field-neighborhood-valid',
          city: '@test-field-city-valid',
          state: '@test-field-state-valid'
        }
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

    for (const field of httpRequestBodyFields) {
      MissingFields += !(field in httpRequest.body) ? `${field} ` : ''
    }
    if ('address' in httpRequest.body && httpRequest.body.address !== undefined) {
      for (const addressField of httpRequestBodyAddressFields) {
        MissingFields += !(addressField in httpRequest.body.address) ? `${addressField} ` : ''
      }
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpRequestBodyLength).not.toBe(expectedHttpRequestBodyLength)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage).toEqual(new MissingParamError(MissingFields))
  })

  test('return from httpResponse "{status Code: 400}" if password confirmation does not match <version 0.0.1>', async () => {
    const { systemUnderTest } = makeSignUpController()
    const httpRequest: IHttpRequest = {
      body: {
        password: '@test-field-password-valid',
        passwordConfirmation: '@test-field-password-invalid'
      }
    }

    const httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage).toEqual(new InvalidParamError('passwordConfirmation'))
  })
})

// name RegEXP /^[a-zA-Z\u00C0-\u017F´]+\s+[a-zA-Z\u00C0-\u017F´]{0,}$/
// email RegEXP /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
// password RegEXP /^(?=.*\d)(?=.*[a-zA-Z])(?!.*[\W_\x7B-\xFF]).{8,16}$/
