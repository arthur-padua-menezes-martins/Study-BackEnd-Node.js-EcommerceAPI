import { IAccountModel } from './import-all'

export interface SearchAccountByEmailRepository {
  searchByEmail: (email: string) => Promise<IAccountModel | null>
}
