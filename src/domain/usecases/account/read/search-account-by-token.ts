import { IAccountModel } from '../import-all'

export interface ISearchAccountByToken {
  searchByToken: (token: string, role?: string) => Promise<IAccountModel | null>
}
