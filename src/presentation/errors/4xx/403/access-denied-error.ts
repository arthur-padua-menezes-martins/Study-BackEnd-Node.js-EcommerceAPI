export class AccessDeniedError extends Error {
  /**
  * @this `this.name`
  * references the type of error
  */
  constructor () {
    super('access denied')

    this.name = 'AccessDeniedError'
  }
}
