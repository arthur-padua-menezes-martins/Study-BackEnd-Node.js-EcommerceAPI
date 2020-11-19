import {
  ISearchAccountByFieldRepository, ISearchAccountByFieldRepositoryModel,
  ISearchAccountByTokenRepository,
  IAccountModel,
  informationsOfAccountModel
} from './mock-read-account-components'

export const mockReadAccount = async (): Promise<ISearchAccountByFieldRepository & ISearchAccountByTokenRepository> => {
  class ReadAccountStub implements ISearchAccountByFieldRepository, ISearchAccountByTokenRepository {
    async searchByField (fields?: ISearchAccountByFieldRepositoryModel): Promise<IAccountModel | null> {
      return informationsOfAccountModel.enabled
    }

    async searchByToken (token?: string, role?: string): Promise<IAccountModel | null> {
      return informationsOfAccountModel.enabled
    }
  }

  return new ReadAccountStub()
}
