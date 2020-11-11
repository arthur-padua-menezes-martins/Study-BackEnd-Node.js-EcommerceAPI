import {
  ISearchAccountByFieldRepository, ISearchAccountByFieldRepositoryParams,
  IAccountModel,
  accountModelEnabled
} from './make-read-account-components'

export const makeReadAccount = async (): Promise<ISearchAccountByFieldRepository> => {
  class ReadAccountStub implements ISearchAccountByFieldRepository {
    async searchByField (fields?: ISearchAccountByFieldRepositoryParams, role?: string): Promise<IAccountModel | null> {
      return accountModelEnabled
    }
  }

  return new ReadAccountStub()
}
