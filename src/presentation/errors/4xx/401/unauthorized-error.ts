export class UnauthorizedError extends Error {
  /**
  * @this `this.name`
  * references the type of error
  */
  constructor () {
    super('acesso não autorizado')

    this.name = 'UnauthorizedError'
  }
}
