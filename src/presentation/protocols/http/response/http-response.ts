/**
* @interface
* general interface for HTTP Response
* @returns
* `statusCode` status code
* @returns
* `body` non-specific body
* @returns
* `successMessage ?` success message
* @returns
* `errorMessage ?` error message
* @returns
* `invalidFields ?` invalid fields
*/
export interface IHttpResponse {
  statusCode: number
  body: object
  successMessage?: string
  errorMessage?: Error
  invalidFields?: string[]
}
