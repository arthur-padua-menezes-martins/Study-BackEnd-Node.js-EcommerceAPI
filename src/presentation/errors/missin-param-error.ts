export class MissingParamError extends Error {
  /**
  * @param missingParameter
  * missing parameter(s)
  * @this `this.name`
  * references the type of error
  */
  constructor (missingParameter?: string) {
    if (typeof missingParameter !== 'undefined' && missingParameter !== '') {
      super(`preencha corretamente o(s) campo(s) ${missingParameter}`)
    } else {
      super('preencha corretamente todos os campos')
    }

    this.name = 'MissingParamError'
  }
}
