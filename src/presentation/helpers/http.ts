import { IHttpResponse } from '../protocols/export-all'

export const badRequest = (body: Object, successMessage: string, errorMessage: Error): IHttpResponse => {
  return {
    statusCode: 400,
    body: body,
    successMessage: successMessage,
    errorMessage: errorMessage
  }
}
