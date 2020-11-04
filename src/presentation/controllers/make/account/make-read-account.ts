import {
  IAccountModel,
  ISearchAccountByField,
  accountModelDisabled
} from './make-read-account-components'

export const makeReadAccount = async (): Promise<ISearchAccountByField> => {
  class ReadAccountStub implements ISearchAccountByField {
    async searchByField (): Promise<IAccountModel | null> {
      return await Promise.resolve(accountModelDisabled)
    }
  }

  return await Promise.resolve(new ReadAccountStub())
}
