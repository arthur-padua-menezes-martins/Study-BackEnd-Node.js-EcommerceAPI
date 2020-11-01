import { IHttpRequest, IHttpResponse } from '../export-all'

/**
* @method `handle`
* handles HTTP Request and generates httpResponse
* @param httpRequest
* implemetation of IHttpRequest
*/
export interface IController {
  handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
}
