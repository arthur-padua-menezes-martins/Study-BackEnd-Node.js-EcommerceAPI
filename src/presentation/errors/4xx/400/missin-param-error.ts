export class MissingParamError extends Error {
  /**
  * @param missingParameter
  * missing parameter(s)
  * @this `this.name`
  * references the type of error
  */
  constructor (missingParameter?: string) {
    if (missingParameter) {
      super(`correctly fill in the field (s) ${missingParameter}`)
    } else {
      super('fill out all the fields')
    }

    this.name = 'MissingParamError'
  }
}
