import {
  IMiddleware,
  IHttpRequest, IHttpResponse,
  ISearchAccountByAccessToken
} from './auth-middleware-protocols'
import {
  AccessDeniedError
} from './auth-middleware-errors'
import {
  ok, forbidden, serverError
} from './auth-middleware-helpers'

export class AuthMiddleware implements IMiddleware {
  constructor (
    private readonly readAccount: ISearchAccountByAccessToken,
    private readonly role?: string
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']

      if (accessToken) {
        const account = await this.readAccount.searchByAccessToken(accessToken, this.role)

        if (account) {
          return ok({ account: { id: account.id } })
        }
      }

      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
