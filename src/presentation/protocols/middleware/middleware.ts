import {
  IHttpRequestHeaders, IHttpResponse
} from '../export-all'

/**
* @method `handle`
* handles HTTP Request and generates httpResponse
* @param httpRequest
* implemetation of IHttpRequest
*/
export interface IMiddleware {
  handle: (httpRequest: IHttpRequestHeaders) => Promise<IHttpResponse>
}
