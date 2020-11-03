import {
  IUpdateEnabledAccount,
  IUpdateEnabledAccountRepository
} from './db-update-enabled-account-protocols'

export class DatabaseEnabledAccountController implements IUpdateEnabledAccount {
  constructor (
    private readonly updateAccountRepository: IUpdateEnabledAccountRepository
  ) {}

  async updateEnabled (id: string, status: boolean): Promise<void> {
    await this.updateAccountRepository.updateEnabled(id, status)
  }
}
