export class InvalidParamError extends Error {
  /**
  * @param invalidParameter
  * invalid parameter(s)
  * @this `this.name`
  * references the type of error
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
