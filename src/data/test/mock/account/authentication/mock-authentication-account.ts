import { IAuthentication } from './mock-authentication-account-components'

export const mockAuthenticationAccount = async (): Promise<IAuthentication> => {
  class AuthenticationAccountStub implements IAuthentication {
    async auth (): Promise<string> {
      return 'any_token'
    }
  }

  return new AuthenticationAccountStub()
}
