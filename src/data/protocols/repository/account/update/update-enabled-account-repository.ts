export interface IUpdateEnabledAccountRepository {
  updateEnabled: (id: string, status: boolean) => Promise<void>
}
