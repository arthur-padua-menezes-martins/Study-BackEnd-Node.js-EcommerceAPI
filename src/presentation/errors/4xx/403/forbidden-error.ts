export class ForbiddenError extends Error {
  /**
  * @this `this.name`
  * references the type of error
  */
  constructor () {
    super('forbidden')

    this.name = 'ForbiddenError'
  }
}
