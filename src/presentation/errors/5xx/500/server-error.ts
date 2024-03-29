export class ServerError extends Error {
  /**
  * @param errorStack
  * error stack
  * @this `this.name`
  * references the type of error
  * @this `this.message`
  * references a generic error message
  * @this `this.stack`
  * references a errorStack
  */
  constructor (errorStack?: string) {
    super('a problem affects the functioning of the server, try again later!')

    this.name = 'ServerError'
    this.stack = errorStack
  }
}
