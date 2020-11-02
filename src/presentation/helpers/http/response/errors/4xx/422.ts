import { IHttpResponse, UnprocessableError } from '../../import-all'

/**
* the server cannot process the request due to the unprocessable error
*/
export const unprocessable = (): IHttpResponse => ({
  statusCode: 422,
  body: {},
  errorMessage: new UnprocessableError()
})
