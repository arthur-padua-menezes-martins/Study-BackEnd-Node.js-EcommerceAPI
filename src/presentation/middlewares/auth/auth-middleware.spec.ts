import {
  AuthMiddleare
} from './auth-middleware'
import {
  IHttpRequest,
  ISearchAccountByField
} from './auth-middleware-protocols'
import {
  makeReadAccount
} from './auth-middleware-make'
import {
  informationsOfAccessTokenHttpRequestHeaders
} from './auth-middleware-utils'

interface ISystemUnderTestTypes {
  systemUnderTest: AuthMiddleare
  readAccountStub: ISearchAccountByField
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  const readAccountStub = await makeReadAccount()
  const systemUnderTest = new AuthMiddleare(readAccountStub)

  return {
    systemUnderTest,
    readAccountStub
  }
}

const httpRequest: IHttpRequest['headers'] = {
  headers: {

  }
}

describe('Auth Middleware', () => {
  test('return from httpResponse "{statusCode: 403}" if no x-access-token exists in headers <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    const httpResponse = await systemUnderTest.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(403)
    expect(httpResponse.errorMessage?.name).toBe('AccessDeniedError')
  })

  test('should call searchAccountByFields with accessToken <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    httpRequest.headers = informationsOfAccessTokenHttpRequestHeaders
    const httpResponse = await systemUnderTest.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(403)
    expect(httpResponse.errorMessage?.name).toBe('AccessDeniedError')
  })

  test('should call searchAccountByFields with accessToken <version: 0.0.1>', async () => {
    const { systemUnderTest, readAccountStub } = await makeSystemUnderTest()

    jest.spyOn(readAccountStub, 'searchByField').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await systemUnderTest.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(403)
    expect(httpResponse.errorMessage?.name).toBe('AccessDeniedError')
  })

  test('should call searchAccountByFields with accessToken <version: 0.0.1>', async () => {
    const { systemUnderTest, readAccountStub } = await makeSystemUnderTest()

    jest.spyOn(readAccountStub, 'searchByField').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await systemUnderTest.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(403)
    expect(httpResponse.errorMessage?.name).toBe('AccessDeniedError')
  })
})
