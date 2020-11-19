import {
  IAddAccountRepository,
  IAccountModel,
  IAddAccountModel,
  informationsOfAccountModel
} from './mock-write-account-components'

export const mockWriteAccount = async (): Promise<IAddAccountRepository> => {
  class WriteAccountStub implements IAddAccountRepository {
    async add (accountData: IAddAccountModel): Promise<IAccountModel> {
      return informationsOfAccountModel.disabled
    }
  }

  return new WriteAccountStub()
}
