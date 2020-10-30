import { IAccountModel } from '../../models/account/account'

export interface IAddAccountModel {
  [field: string]: string | object
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
}

export interface IAddAccount {
  add: (account: IAddAccountModel) => Promise<IAccountModel>
}
