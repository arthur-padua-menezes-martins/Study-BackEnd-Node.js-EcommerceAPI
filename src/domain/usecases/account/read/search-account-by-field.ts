import { IAccountModel } from '../import-all'

export interface ISearchAccountByFieldModel {
  email?: string
  cpf?: string
}
export interface ISearchAccountByField {
  searchByField: (field: ISearchAccountByFieldModel) => Promise<IAccountModel | null>
}
