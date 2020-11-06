export interface IAccountModel {
  [field: string]: string | object | boolean
  personal: {
    [field: string]: string
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
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
  id: string
}
