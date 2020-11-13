export class UnprocessableError extends Error {
  /**
  * @this `this.name`
  * references the type of error
  */
  constructor () {
    super('instructions could not be processed')

    this.name = 'UnprocessableError'
  }
}
