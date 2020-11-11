import {
  ISearchAccountByFieldRepository, ISearchAccountByFieldRepositoryModel,
  ISearchAccountByAccessTokenRepository,
  IAccountModel,
  accountModelEnabled
} from './make-read-account-components'

export const makeReadAccount = async (): Promise<ISearchAccountByFieldRepository & ISearchAccountByAccessTokenRepository> => {
  class ReadAccountStub implements ISearchAccountByFieldRepository, ISearchAccountByAccessTokenRepository {
    async searchByField (fields?: ISearchAccountByFieldRepositoryModel): Promise<IAccountModel | null> {
      return accountModelEnabled
    }

    async searchByAccessToken (accessToken?: string, role?: string): Promise<IAccountModel | null> {
      return accountModelEnabled
    }
  }

  return new ReadAccountStub()
}
