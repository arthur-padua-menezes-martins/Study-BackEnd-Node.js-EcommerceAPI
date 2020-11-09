import {
  IAddAccountRepository,
  IAccountModel,
  IAddAccountModel,
  accountModelDisabled
} from './make-write-account-components'

export const makeWriteAccount = async (): Promise<IAddAccountRepository> => {
  class WriteAccountStub implements IAddAccountRepository {
    async add (accountData: IAddAccountModel): Promise<IAccountModel> {
      return accountModelDisabled
    }
  }

  return new WriteAccountStub()
}
