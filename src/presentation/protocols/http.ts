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

/**
* @interface
* general interface for HTTP Request
* @returns
* `body`
* @type { IHttpRequestBody | IHttpRequestBodyComplete }
*/
export interface IHttpRequest {
  body: IHttpRequestBody | IHttpRequestBodyComplete
}

/**
* @interface
* general interface for HTTP Response
* @returns
* `statusCode` status code
* @returns
* `body` non-specific body
* @returns
* `successMessage ?` success message
* @returns
* `errorMessage ?` error message
* @returns
* `invalidFields ?` invalid fields
*/
export interface IHttpResponse {
  statusCode: number
  body: object
  successMessage?: string
  errorMessage?: Error
  invalidFields?: string[]
}
