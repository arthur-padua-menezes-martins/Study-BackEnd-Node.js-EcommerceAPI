import {
  IAccountModel,
  ISearchAccountByField,
  accountModelEnabled
} from './make-read-account-components'

export const makeReadAccount = async (): Promise<ISearchAccountByField> => {
  class ReadAccountStub implements ISearchAccountByField {
    async searchByField (): Promise<IAccountModel | null> {
      return accountModelEnabled
    }
  }

  return new ReadAccountStub()
}
