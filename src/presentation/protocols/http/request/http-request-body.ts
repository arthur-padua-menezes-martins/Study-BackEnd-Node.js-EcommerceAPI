export interface IHttpRequestBody {
  [field: string]: string | object | any
  name?: string
  email?: string
  password?: string
  passwordConfirmation?: string
  address?: {
    [field: string]: string
    cep: string
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
  }
}

export interface IHttpRequestBodyComplete {
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
  question: string
  answers: any
}
