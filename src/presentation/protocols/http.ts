export interface IHttpRequest {
  body: {
    name?: string | undefined
    email?: string | undefined
    password?: string | undefined
    passwordConfirmation?: string | undefined
    address?: {
      cep: string | undefined
      street: string | undefined
      number: string | undefined
      neighborhood: string | undefined
      city: string | undefined
      state: string | undefined
    }
  }
}

export interface IHttpResponse {
  statusCode: number
  body: object
  successMessage?: string
  errorMessage?: Error
  invalidFields? : string[]
}
