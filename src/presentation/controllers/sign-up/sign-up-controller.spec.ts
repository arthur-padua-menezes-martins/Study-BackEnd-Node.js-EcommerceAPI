import {
  SignUpController
} from './sign-up-controller'
import {
  IHttpRequest, IHttpResponse,
  IAddAccount
} from './sign-up-controller-protocols'
import {
  validationCompositeStub,
  makeReadAccount,
  makeWriteAccount,
  makeUpdateAccount,
  makeEmailSender
} from './sign-up-controller-make'
import {
  signUpHttpRequestBodyMatchComplete, signUpHttpRequestBodyMissingField, signUpHttpRequestBodyInvalidPasswordConfirmation
} from './sign-up-controller-helpers'

interface ISignUpControllerTypes {
  systemUnderTest: SignUpController
  writeAccountStub: IAddAccount
}
const makeSystemUnderTest = async (): Promise<ISignUpControllerTypes> => {
  const readAccountStub = await makeReadAccount()
  const writeAccountStub = await makeWriteAccount()
  const updateAccountStub = await makeUpdateAccount()
  const emailSender = await makeEmailSender()
  const systemUnderTest = await new SignUpController(validationCompositeStub, readAccountStub, writeAccountStub, updateAccountStub, emailSender)

  return {
    systemUnderTest,
    writeAccountStub
  }
}

const httpRequest: IHttpRequest = {
  body: signUpHttpRequestBodyMatchComplete
}
let httpResponse: IHttpResponse = {
  statusCode: null,
  body: null,
  successMessage: null,
  errorMessage: null,
  invalidFields: null
}

describe('SignUpController', () => {
  test('returns from httpResponse: "{statusCode: 400}" if any required fields belonging to httpRequestBody do not exist <version 0.0.3>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    httpRequest.body = signUpHttpRequestBodyMissingField

    httpResponse = await systemUnderTest.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage?.name).toBe('MissingParamError')
  })

  test('returns from httpResponse "{status Code: 400}" if the password confirmation does not match the password <version 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    httpRequest.body = signUpHttpRequestBodyInvalidPasswordConfirmation

    httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage?.name).toBe('InvalidParamError')
  })

  test('returns from httpResponse "{status Code: 500}" if AddAccount throw error <version 0.0.1>', async () => {
    const { systemUnderTest, writeAccountStub } = await makeSystemUnderTest()
    httpRequest.body = signUpHttpRequestBodyMatchComplete

    jest.spyOn(writeAccountStub, 'add').mockImplementationOnce(async () => {
      throw new Error()
    })

    httpResponse = await systemUnderTest.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.errorMessage?.name).toBe('ServerError')
  })

  test('must call AddAccount with the correct values <version 0.0.1>', async () => {
    const { systemUnderTest, writeAccountStub } = await makeSystemUnderTest()

    const spyOnAdd = await jest.spyOn(writeAccountStub, 'add')

    await systemUnderTest.handle(httpRequest)
    expect(spyOnAdd).toHaveBeenCalledWith({
      ...signUpHttpRequestBodyMatchComplete,
      enabled: false
    })
  })

  test('returns from httpResponse "{status Code: 202}" if valid information is sent to AddAccount <version 0.0.2>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(202)
  })
})
