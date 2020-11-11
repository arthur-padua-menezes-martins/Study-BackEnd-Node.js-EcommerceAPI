import { SignInController } from './sign-in-controller'
import {
  IHttpResponse,
  IAuthentication, IValidation
} from './sign-in-controller-protocols'
import {
  validationCompositeStub,
  makeAuthenticationAccount
} from './sign-in-controller-make'
import {
  informationsOfSignInHttpRequestBodyFields, informationsOfSignInHttpRequestBodyMatch, informationsOfSignInHttpRequestBodyNotMatch, informationsOfSignInHttpRequestBodyMissingField
} from './sign-in-controller-utils'

interface ISignUpControllerTypes {
  systemUnderTest: SignInController
  validationCompositeStub: IValidation
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

const httpRequest: any = {
  body: {
    user: {
      informations: {
        personal: informationsOfSignInHttpRequestBodyMatch
      }
    }
  }
}
let httpResponse: IHttpResponse = {
  statusCode: Number(),
  body: Object()
}

describe('SignInController', () => {
  test('returns from httpResponse: "{statusCode: 400}" if any required_fields belonging to httpRequest.body do not exist <version 0.0.1>', async () => {
    const { systemUnderTest, validationCompositeStub } = await makeSystemUnderTest()
    httpRequest.body.user.informations.personal = informationsOfSignInHttpRequestBodyMissingField
    const { personal } = httpRequest.body.user.informations

    const SpyOnValidate = jest.spyOn(validationCompositeStub, 'validate')

    httpResponse = await systemUnderTest.handle(httpRequest)
    expect(SpyOnValidate).toHaveBeenCalledWith(({
      type: 'required_fields',
      fields: informationsOfSignInHttpRequestBodyFields,
      body: personal,
      checkThisType: 'string',
      checkTheTypeOfThis: personal
    }))
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage?.name).toBe('MissingParamError')
  })

  test('returns from httpResponse "{status Code: 400}" if any fields do not match validation <version 0.0.1>', async () => {
    const { systemUnderTest, validationCompositeStub } = await makeSystemUnderTest()
    httpRequest.body.user.informations.personal = informationsOfSignInHttpRequestBodyNotMatch
    const { personal } = httpRequest.body.user.informations

    const SpyOnValidate = jest.spyOn(validationCompositeStub, 'validate')

    httpResponse = await systemUnderTest.handle(httpRequest)
    expect(SpyOnValidate).toHaveBeenCalledWith(({
      type: 'validate_fields',
      fields: informationsOfSignInHttpRequestBodyFields,
      body: personal,
      checkThisType: 'string',
      checkTheTypeOfThis: personal
    }))
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage?.name).toBe('InvalidParamError')
  })

  test('returns from httpResponse "{status Code: 500}" if sending data to validate any field generates an error <version 0.0.1>', async () => {
    const { systemUnderTest, validationCompositeStub } = await makeSystemUnderTest()

    jest.spyOn(validationCompositeStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })

    httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.errorMessage?.name).toBe('ServerError')
  })
})
