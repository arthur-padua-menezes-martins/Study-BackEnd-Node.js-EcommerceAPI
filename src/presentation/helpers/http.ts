import { IHttpResponse } from '../protocols/export-all'

export const badRequest = (body: Object, successMessage?: string, errorMessage?: any, invalidFields?: string[]): IHttpResponse => ({
  statusCode: 400,
  body: body,
  successMessage: successMessage,
  errorMessage: errorMessage,
  invalidFields: invalidFields
})
