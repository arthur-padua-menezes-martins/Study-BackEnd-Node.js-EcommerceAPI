import {
  IHttpRequestBody
} from './http-request-body'

/**
* @interface
* general interface for HTTP Request
*/
export interface IHttpRequest {
  body: IHttpRequestBody
  params?: any
  query?: any
  headers?: any
}
