import { IHttpRequestBody } from '../../http/request/http-request-body'

export interface IFieldValidationInputContent {
  fields: string[]
  body: IHttpRequestBody
}
