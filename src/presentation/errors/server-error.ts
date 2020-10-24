/**
* the server cannot or will not process the request due to a server error
*/
export class ServerError extends Error {
  /**
  * @param errorStack
  * error stack
  * @this `this.name`
  * references the class name
  * @this `this.message`
  * references a generic error message
  * @this `this.stack`
  * references a errorStack
  */
  constructor (errorStack: string | undefined) {
    super('um problema afetou o funcionamento do servidor, tente novamente em breve!')

    this.name = 'ServerError'
    this.stack = errorStack
  }
}
