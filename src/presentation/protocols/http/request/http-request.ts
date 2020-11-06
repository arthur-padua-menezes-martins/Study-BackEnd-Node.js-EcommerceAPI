import { IHttpRequestBody } from './http-request-body'

/**
* @interface
* general interface for HTTP Request
*/
export interface IHttpRequest {
  params?: any
  query?: any
  body: IHttpRequestBody
}
