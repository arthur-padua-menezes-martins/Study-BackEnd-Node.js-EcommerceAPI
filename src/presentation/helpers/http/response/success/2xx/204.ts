import { IHttpResponse } from '../../import-all'

/**
* the server took an expected action
* @param body
* specific content for each implementation
* @param successMessage
* success message
*/
export const noContent = (body: object = {}, successMessage?: string): IHttpResponse => ({
  statusCode: 204,
  body: body,
  successMessage: successMessage
})
