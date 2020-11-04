import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel
} from './make-write-account-components'

export const makeWriteAccount = async (): Promise<IAddAccount> => {
  class WriteAccountStub implements IAddAccount {
    async add (accountData: IAddAccountModel): Promise<IAccountModel> {
      const accountNotActivated = {
        id: '',
        ...accountData,
        enabled: false
      }

      return accountNotActivated
    }
  }

  return await Promise.resolve(new WriteAccountStub())
}
