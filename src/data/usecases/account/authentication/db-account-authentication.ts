import {
  IAuthentication, IAuthenticationModel,
  ISearchAccountByFieldRepository,
  IHashComparer,
  IEncrypter,
  IUpdateAccessTokenRepository
} from './db-account-authentication-protocols'

export class DatabaseAccountAuthenticationController implements IAuthentication {
  constructor (
    private readonly readAccount: ISearchAccountByFieldRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly updateAccountRepository: IUpdateAccessTokenRepository
  ) {}

  async auth (authentication: IAuthenticationModel): Promise<string | null> {
    const account = await this.readAccount.searchByField({ email: authentication.email })

    if (account) {
      const isEqual = await this.hashComparer.compare(authentication.password, account.password)

      if (isEqual) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccountRepository.updateAccessToken(account.id, accessToken)

        return accessToken
      }
    }

    return null
  }
}
