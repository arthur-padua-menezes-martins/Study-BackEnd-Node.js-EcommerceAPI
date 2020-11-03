import { IHttpRequestBody, IHttpRequestBodyComplete } from './http-request-body'

/**
* @interface
* general interface for HTTP Request
* @returns
* `body`
* @type { IHttpRequestBody | IHttpRequestBodyComplete }
*/
export interface IHttpRequest {
  params?: any
  query?: any
  body: IHttpRequestBody | IHttpRequestBodyComplete
}
