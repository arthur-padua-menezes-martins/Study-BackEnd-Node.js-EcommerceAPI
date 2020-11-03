import { IHttpResponse } from '../../import-all'

/**
* the server cannot or will not process the request due to client error
* @param body
* specific content for each implementation
* @param successMessage
* success message
* @param errorMessage
* error message
* @param invalidFields
* invalid fields which caused the function to be invoked
*/
export const badRequest = (body: Object = {}, successMessage?: string, errorMessage?: any, invalidFields?: string[]): IHttpResponse => ({
  statusCode: 400,
  body: body,
  successMessage: successMessage,
  errorMessage: errorMessage,
  invalidFields: invalidFields
})
