export interface IUpdateEnabledAccount {
  updateEnabled: (id: string, status: boolean) => Promise<void>
}
