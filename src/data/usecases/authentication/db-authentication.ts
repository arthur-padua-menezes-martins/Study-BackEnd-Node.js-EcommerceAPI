import {
  Authentication, IAuthenticationModel,
  SearchAccountByEmailRepository,
  IHashComparer,
  IEncrypter,
  UpdateAccessTokenRepository
} from './db-authentication-protocols'

export class DatabaseAuthenticationController implements Authentication {
  constructor (
    private readonly searchAccountByEmailRepository: SearchAccountByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: IAuthenticationModel): Promise<string | null> {
    const account = await this.searchAccountByEmailRepository.searchByEmail(authentication.email)

    if (account) {
      const isEqual = await this.hashComparer.compare(authentication.password, account.password)

      if (isEqual) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return accessToken
      }
    }

    return null
  }
}
