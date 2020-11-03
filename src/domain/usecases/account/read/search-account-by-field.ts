import { IAccountModel } from '../import-all'

export interface ISearchAccountByFieldModel {
  id?: string
  email?: string
  cpf?: string
}
export interface ISearchAccountByField {
  searchByField: (field: ISearchAccountByFieldModel) => Promise<IAccountModel | null>
}
