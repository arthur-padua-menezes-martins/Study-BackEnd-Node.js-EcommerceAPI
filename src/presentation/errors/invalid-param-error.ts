/**
* one or more parameters do not comply with validation
* @returns
* ``this.name`` references the class name ``this.message`` references a specific error message
*/
export class InvalidParamError extends Error {
  /**
  * @param invalidParameter
  * invalid parameter(s)
  * @this `this.name`
  * references the class name
  */
  constructor (invalidParameter?: string) {
    if (typeof invalidParameter !== 'undefined' && invalidParameter !== '') {
      super(`preencha corretamente o(s) seguinte(s) campo(s) ${invalidParameter}`)
    } else {
      super('preencha todos os campos corretamente')
    }

    this.name = 'InvalidParamError'
  }
}
