export class UnprocessableError extends Error {
  /**
  * @this `this.name`
  * references the type of error
  */
  constructor () {
    super('não foi possível processar as instruções')

    this.name = 'UnprocessableError'
  }
}
