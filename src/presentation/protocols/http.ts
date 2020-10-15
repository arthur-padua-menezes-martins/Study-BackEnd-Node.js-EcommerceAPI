export interface IHttpRequestBody {
  name?: string
  email?: string
  password?: string
  passwordConfirmation?: string
  address?: {
    cep: string
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
  }
}

export interface IHttpRequestBodyComplete {
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

export interface IHttpRequest {
  body: IHttpRequestBody | IHttpRequestBodyComplete | any
}

export interface IHttpResponse {
  statusCode: number
  body: object
  successMessage?: string
  errorMessage?: Error
  invalidFields?: string[]
}
