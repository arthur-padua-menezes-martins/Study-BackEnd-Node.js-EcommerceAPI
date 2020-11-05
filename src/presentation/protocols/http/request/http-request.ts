import { IHttpRequestBody, IHttpRequestBodyComplete } from './http-request-body'

/**
* @interface
* general interface for HTTP Request
*/
export interface IHttpRequest {
  params?: any
  query?: any
  body: IHttpRequestBodyComplete | IHttpRequestBody
}
