export class InvalidParamError extends Error {
  /**
  * @param invalidParameter
  * invalid parameter(s)
  * @this `this.name`
  * references the type of error
  */
  constructor (invalidParameter?: string) {
    if (invalidParameter) {
      super(`correctly fill in the following field (s) ${invalidParameter}`)
    } else {
      super('complete all the fields correctly')
    }

    this.name = 'InvalidParamError'
  }
}
