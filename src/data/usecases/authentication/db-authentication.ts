import {
  Authentication, IAuthenticationModel,
  LoadAccountByEmailRepository,
  IHashComparer,
  IEncrypter,
  UpdateAccessTokenRepository
} from './db-authentication-protocols'

export class DatabaseAuthenticationController implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: IHashComparer
  private readonly encrypter: IEncrypter
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository

  constructor (
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: IHashComparer,
    encrypter: IEncrypter,
    updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.encrypter = encrypter
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: IAuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)

    if (account) {
      const isEqual = await this.hashComparer.compare(authentication.password, account.password)

      if (isEqual) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.update(account.id, accessToken)
        return accessToken
      }
    }

    return null
  }
}
