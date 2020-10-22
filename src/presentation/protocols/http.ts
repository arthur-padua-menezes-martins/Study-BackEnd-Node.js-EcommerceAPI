export interface IHttpRequestBody {
  [field?: string]
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
  [field: string]: string | object
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
  body: IHttpRequestBody | IHttpRequestBodyComplete
}

export interface IHttpResponse {
  statusCode: number
  body: object
  successMessage?: string
  errorMessage?: Error
  invalidFields?: string[]
}
