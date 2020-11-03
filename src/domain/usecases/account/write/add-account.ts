import { IAccountModel } from '../import-all'

export interface IAddAccountModel {
  [field: string]: string | boolean | object
  name: string
  email: string
  password: string
  passwordConfirmation: string
  address: {
    [field: string]: string
    cep: string
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
  }
  enabled: boolean
}

export interface IAddAccount {
  add: (accountData: IAddAccountModel) => Promise<IAccountModel>
}
