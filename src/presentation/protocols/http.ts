export interface IHttpRequest {
  body?: any
}

export interface IHttpResponse {
  statusCode: number
  body: any
  successMessage?: string
  errorMessage?: string
}
