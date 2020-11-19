import {
  IUpdateAccessTokenRepository,
  IUpdateEnabledAccountRepository
} from './make-update-account-components'

export const makeUpdateAccount = async (): Promise<IUpdateAccessTokenRepository & IUpdateEnabledAccountRepository> => {
  class UpdateAccountStub implements IUpdateAccessTokenRepository, IUpdateEnabledAccountRepository {
    async updateAccessToken (id: string, accessToken: string): Promise<void> {

    }

    async updateEnabled (): Promise<void> {

    }
  }

  return new UpdateAccountStub()
}
