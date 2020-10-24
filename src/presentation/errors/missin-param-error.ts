/**
* one or more parameters do not obey the requirement
* @returns
* ``this.name`` references the class name ``this.message`` references a specific error message
*/
export class MissingParamError extends Error {
  /**
  * @param missingParameter
  * missing parameter(s)
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
