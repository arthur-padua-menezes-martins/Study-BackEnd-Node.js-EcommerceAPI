import {
  IAddAccountRepository,
  IAccountModel,
  IAddAccountModel,
  informationsOfAccountModel
} from './make-write-account-components'

export const makeWriteAccount = async (): Promise<IAddAccountRepository> => {
  class WriteAccountStub implements IAddAccountRepository {
    async add (accountData: IAddAccountModel): Promise<IAccountModel> {
      return informationsOfAccountModel.disabled
    }
  }

  return new WriteAccountStub()
}
