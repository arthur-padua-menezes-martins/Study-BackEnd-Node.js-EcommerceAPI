import {
  SignUpController
} from './sign-up-controller'
import {
  IHttpResponse,
  IAddAccount
} from './sign-up-controller-protocols'
import {
  validationCompositeStub,
  makeWriteAccount,
  makeUpdateAccount,
  makeEmailSender
} from './sign-up-controller-make'
import {
  informationsOfSignUpHttpRequest
} from './sign-up-controller-utils'

interface ISignUpControllerTypes {
  systemUnderTest: SignUpController
  writeAccountStub: IAddAccount
}
const makeSystemUnderTest = async (): Promise<ISignUpControllerTypes> => {
  const writeAccountStub = await makeWriteAccount()
  const updateAccountStub = await makeUpdateAccount()
  const emailSender = await makeEmailSender()
  const systemUnderTest = new SignUpController(validationCompositeStub, writeAccountStub, updateAccountStub, emailSender)

  return {
    systemUnderTest,
    writeAccountStub
  }
}

const httpRequest: any = {
  params: {},
  body: {
    user: {
      informations: informationsOfSignUpHttpRequest.bodyMatch
    }
  },
  query: {}
}
let httpResponse: IHttpResponse = {
  statusCode: Number(),
  body: Object()
}

describe('SignUpController', () => {
  test('returns from httpResponse: "{statusCode: 400}" if any required_fields belonging to httpRequestBody do not exist <version 0.0.3>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    httpRequest.body.user.informations = informationsOfSignUpHttpRequest.bodyMissingField

    httpResponse = await systemUnderTest.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage?.name).toBe('MissingParamError')
  })

  test('returns from httpResponse "{status Code: 400}" if the password confirmation does not match the password <version 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    httpRequest.body.user.informations = informationsOfSignUpHttpRequest.bodyInvalidPasswordConfirmation

    httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage?.name).toBe('InvalidParamError')
  })

  test('returns from httpResponse "{status Code: 500}" if AddAccount throw error <version 0.0.1>', async () => {
    const { systemUnderTest, writeAccountStub } = await makeSystemUnderTest()
    httpRequest.body.user.informations = informationsOfSignUpHttpRequest.bodyMatch

    jest.spyOn(writeAccountStub, 'add').mockImplementationOnce(async () => {
      throw new Error()
    })

    httpResponse = await systemUnderTest.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.errorMessage?.name).toBe('ServerError')
  })

  test('must call AddAccount with the correct values <version 0.0.1>', async () => {
    const { systemUnderTest, writeAccountStub } = await makeSystemUnderTest()

    const spyOnAdd = jest.spyOn(writeAccountStub, 'add')

    await systemUnderTest.handle(httpRequest)
    expect(spyOnAdd).toHaveBeenCalledWith(informationsOfSignUpHttpRequest.bodyMatch)
  })

  test('returns from httpResponse "{status Code: 202}" if valid information is sent to AddAccount <version 0.0.2>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(202)
  })
})
