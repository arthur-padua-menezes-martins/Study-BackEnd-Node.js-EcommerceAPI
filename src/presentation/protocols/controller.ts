import { IHttpRequest, IHttpResponse } from './export-all'

export interface Controller {
  handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
}
