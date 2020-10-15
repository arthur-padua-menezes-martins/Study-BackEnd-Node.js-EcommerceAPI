export interface IHttpRequestBody {
  body: {
    name?: any
    email?: any
    password?: any
    passwordConfirmation?: any
    address?: {
      cep: any
      street: any
      number: any
      neighborhood: any
      city: any
      state: any
    }
  }
}

export interface IHttpRequest {
  body: IHttpRequestBody | any
}

export interface IHttpResponse {
  statusCode: number
  body: object
  successMessage?: string
  errorMessage?: Error
  invalidFields? : string[]
}
