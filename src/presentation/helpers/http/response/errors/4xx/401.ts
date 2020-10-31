import { IHttpResponse, UnauthorizedError } from '../../import-all'

/**
* the server cannot process the request due to the unauthorized error
*/
export const unauthorized = (): IHttpResponse => ({
  statusCode: 401,
  body: {},
  errorMessage: new UnauthorizedError()
})
