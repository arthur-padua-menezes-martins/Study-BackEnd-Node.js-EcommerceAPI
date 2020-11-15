import {
  ISearchAccountByFieldRepository, ISearchAccountByFieldRepositoryModel,
  ISearchAccountByTokenRepository,
  IAccountModel,
  accountModelEnabled
} from './make-read-account-components'

export const makeReadAccount = async (): Promise<ISearchAccountByFieldRepository & ISearchAccountByTokenRepository> => {
  class ReadAccountStub implements ISearchAccountByFieldRepository, ISearchAccountByTokenRepository {
    async searchByField (fields?: ISearchAccountByFieldRepositoryModel): Promise<IAccountModel | null> {
      return accountModelEnabled
    }

    async searchByToken (token?: string, role?: string): Promise<IAccountModel | null> {
      return accountModelEnabled
    }
  }

  return new ReadAccountStub()
}
