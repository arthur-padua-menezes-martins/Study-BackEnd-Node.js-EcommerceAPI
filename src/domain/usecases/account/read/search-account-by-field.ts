import { IAccountModel } from '../import-all'

export interface ISearchAccountByFieldModel {
  id?: string
  email?: string
  accessToken?: string
}
export interface ISearchAccountByField {
  searchByField: (field: ISearchAccountByFieldModel, role?: string) => Promise<IAccountModel | null>
}
