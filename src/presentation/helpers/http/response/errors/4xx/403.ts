import { IHttpResponse, ForbiddenError } from '../../import-all'

/**
* the server cannot process the request due to the forbidden error
*/
export const forbidden = (Erro: Error): IHttpResponse => ({
  statusCode: 403,
  body: {},
  errorMessage: Erro || new ForbiddenError()
})
