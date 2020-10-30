import {
  Authentication, IAuthenticationModel,
  LoadAccountByEmailRepository
} from './db-authentication-protocols'

export class DatabaseAuthenticationController implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository

  constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async auth (authentication: IAuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(authentication.email)

    return await Promise.resolve('')
  }
}
