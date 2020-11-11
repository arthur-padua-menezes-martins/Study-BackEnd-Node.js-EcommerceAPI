import { IAccountModel } from '../import-all'

export interface ISearchAccountByAccessToken {
  searchByAccessToken: (accessToken: string, role?: string) => Promise<IAccountModel | null>
}
