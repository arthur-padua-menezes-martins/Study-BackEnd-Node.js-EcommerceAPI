import { IAuthentication } from './make-authentication-account-components'

export const makeAuthenticationAccount = async (): Promise<IAuthentication> => {
  class AuthenticationAccountStub implements IAuthentication {
    async auth (): Promise<string> {
      return await Promise.resolve('any_token')
    }
  }

  return new AuthenticationAccountStub()
}
