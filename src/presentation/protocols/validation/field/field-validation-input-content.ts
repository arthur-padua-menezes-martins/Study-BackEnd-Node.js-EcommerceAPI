import { IHttpRequestBody } from '../../http/request/http-request-body'

export interface IInputContent {
  fields: string[]
  body: IHttpRequestBody
}
