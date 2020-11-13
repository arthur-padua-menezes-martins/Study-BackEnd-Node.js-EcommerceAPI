export class UnauthorizedError extends Error {
  /**
  * @this `this.name`
  * references the type of error
  */
  constructor () {
    super('unauthorized access')

    this.name = 'UnauthorizedError'
  }
}
