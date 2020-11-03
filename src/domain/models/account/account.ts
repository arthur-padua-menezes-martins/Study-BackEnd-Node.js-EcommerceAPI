export interface IAccountModel {
  [field: string]: string | boolean | object
  id: string
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
