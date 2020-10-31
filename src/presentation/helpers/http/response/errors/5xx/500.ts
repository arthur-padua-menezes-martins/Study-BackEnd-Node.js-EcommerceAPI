import { IHttpResponse, ServerError } from '../../import-all'

/**
* the server cannot or will not process the request due to a server error
* @param error
* error thrown
*/
export const serverError = (error: Error): IHttpResponse => ({
  statusCode: 500,
  body: {},
  errorMessage: new ServerError(error.stack)
})
