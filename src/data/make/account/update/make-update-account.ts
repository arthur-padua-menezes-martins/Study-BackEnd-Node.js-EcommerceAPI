import {
  IUpdateAccessToken,
  IUpdateEnabledAccount
} from './make-update-account-components'

export const makeUpdateAccount = async (): Promise<IUpdateAccessToken & IUpdateEnabledAccount> => {
  class UpdateAccountStub implements IUpdateAccessToken, IUpdateEnabledAccount {
    async updateAccessToken (id: string, accessToken: string): Promise<void> {

    }

    async updateEnabled (): Promise<void> {

    }
  }

  return new UpdateAccountStub()
}
