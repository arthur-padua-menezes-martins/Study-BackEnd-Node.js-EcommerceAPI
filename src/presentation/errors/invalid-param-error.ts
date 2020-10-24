/**
* one or more parameters do not comply with validation
* @returns
* ``this.name`` references the class name ``this.message`` references a specific error message
*/
export class InvalidParamError extends Error {
  /**
  * @param invalidParameter
  * invalid parameter(s)
  */
  constructor (invalidParameter?: string) {
    if (typeof invalidParameter !== 'undefined' && invalidParameter !== '') {
      super(`valide corretamente o(s) seguinte(s) campo(s) ${invalidParameter}`)
    } else {
      super('valide corretamente todos os campos')
    }

    this.name = 'InvalidParamError'
  }
}
