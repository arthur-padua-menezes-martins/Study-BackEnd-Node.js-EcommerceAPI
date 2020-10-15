export interface IAccountModel {
  id: string
  name: string
  email: string
  password: string
  passwordConfirmation: string
  address: {
    cep: string
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
  }
}
