/**
* the server cannot or will not process the request due to a server error
* @returns
* ``this.name`` references the class name ``this.message`` references a generic error message ``this.stack`` references a errorStack
*/
export class ServerError extends Error {
  /**
  * @param errorStack
  * error stack
  */
  constructor (errorStack: string | undefined) {
    super('um problema afetou o funcionamento do servidor, tente novamente em breve!')

    this.name = 'ServerError'
    this.stack = errorStack
  }
}
