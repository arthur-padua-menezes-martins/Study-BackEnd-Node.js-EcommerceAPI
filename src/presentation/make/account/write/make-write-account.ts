import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
  accountModelDisabled
} from './make-write-account-components'

export const makeWriteAccount = async (): Promise<IAddAccount> => {
  class WriteAccountStub implements IAddAccount {
    async add (accountData: IAddAccountModel): Promise<IAccountModel> {
      return accountModelDisabled
    }
  }

  return new WriteAccountStub()
}
