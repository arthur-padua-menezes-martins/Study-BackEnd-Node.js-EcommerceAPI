import { IHttpResponse } from '../protocols/export-all'
import { UnauthorizedError, ServerError } from '../errors/export-all'

/**
* the server took an expected action
* @param body
* specific content for each implementation
* @param successMessage
* success message
*/
export const ok = (body: object, successMessage?: string): IHttpResponse => ({
  statusCode: 200,
  body: body,
  successMessage: successMessage
})

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
export const badRequest = (body: Object, successMessage?: string, errorMessage?: any, invalidFields?: string[]): IHttpResponse => ({
  statusCode: 400,
  body: body,
  successMessage: successMessage,
  errorMessage: errorMessage,
  invalidFields: invalidFields
})

/**
* the server cannot process the request due to the unauthorized error
*/
export const unauthorized = (): IHttpResponse => ({
  statusCode: 401,
  body: {},
  errorMessage: new UnauthorizedError()
})

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
