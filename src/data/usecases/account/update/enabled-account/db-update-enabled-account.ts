import {
  IUpdateEnabledAccount,
  IUpdateEnabledAccountRepository
} from './db-update-enabled-account-protocols'

export class DatabaseEnabledAccountController implements IUpdateEnabledAccount {
  constructor (
    private readonly accountRepositoryUpdate: IUpdateEnabledAccountRepository
  ) {}

  async updateEnabled (id: string, status: boolean): Promise<void> {
    await this.accountRepositoryUpdate.updateEnabled(id, status)
  }
}
