import { IAccountModel } from './import-all'

export interface LoadAccountByEmailRepository {
  load: (email: string) => Promise<IAccountModel >
}
