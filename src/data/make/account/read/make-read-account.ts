import {
  ISearchAccountByFieldRepository,
  IAccountModel,
  accountModelEnabled
} from './make-read-account-components'

export const makeReadAccount = async (): Promise<ISearchAccountByFieldRepository> => {
  class ReadAccountStub implements ISearchAccountByFieldRepository {
    async searchByField (): Promise<IAccountModel | null> {
      return accountModelEnabled
    }
  }

  return new ReadAccountStub()
}
