import {
  AuthMiddleware
} from './auth-middleware'
import {
  IHttpRequest,
  ISearchAccountByAccessToken
} from './auth-middleware-protocols'
import {
  makeReadAccount
} from './auth-middleware-make'
import {
  accountModelEnabled,
  informationsOfAccessTokenHttpRequestHeaders
} from './auth-middleware-utils'

interface ISystemUnderTestTypes {
  systemUnderTest: AuthMiddleware
  readAccountStub: ISearchAccountByAccessToken
}
const makeSystemUnderTest = async (role?: string): Promise<ISystemUnderTestTypes> => {
  const readAccountStub = await makeReadAccount()
  const systemUnderTest = new AuthMiddleware(readAccountStub, role)

  return {
    systemUnderTest,
    readAccountStub
  }
}

const httpRequest: IHttpRequest['headers'] = {
  headers: informationsOfAccessTokenHttpRequestHeaders
}
const accessToken = informationsOfAccessTokenHttpRequestHeaders['x-access-token']
const role = 'any_role'

describe('Auth Middleware', () => {
  test('return from httpResponse "{statusCode: 403}" if no x-access-token exists in headers <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    httpRequest.headers = {}
    const httpResponse = await systemUnderTest.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(403)
    expect(httpResponse.errorMessage?.name).toBe('AccessDeniedError')
  })

  test('should call searchByAccessToken with valid accessToken <version: 0.0.2>', async () => {
    const { systemUnderTest, readAccountStub } = await makeSystemUnderTest(role)

    httpRequest.headers = informationsOfAccessTokenHttpRequestHeaders
    const spyOnSearchByAccessToken = jest.spyOn(readAccountStub, 'searchByAccessToken')
    await systemUnderTest.handle(httpRequest)

    expect(spyOnSearchByAccessToken).toHaveBeenCalledWith(accessToken, role)
  })

  test('should return status code 403 if accessToken does not represents a valid token <version: 0.0.1>', async () => {
    const { systemUnderTest, readAccountStub } = await makeSystemUnderTest()

    jest.spyOn(readAccountStub, 'searchByAccessToken').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await systemUnderTest.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(403)
    expect(httpResponse.errorMessage?.name).toBe('AccessDeniedError')
  })

  test('should return status code 200 if accessToken provided to searchByAccessToken represents a valid token <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    const httpResponse = await systemUnderTest.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.account.id).toBe(accountModelEnabled.id)
  })

  test('should return status code 500 if searchByAccessToken throws <version: 0.0.1>', async () => {
    const { systemUnderTest, readAccountStub } = await makeSystemUnderTest()

    jest.spyOn(readAccountStub, 'searchByAccessToken').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await systemUnderTest.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.errorMessage.name).toBe('ServerError')
  })
})
