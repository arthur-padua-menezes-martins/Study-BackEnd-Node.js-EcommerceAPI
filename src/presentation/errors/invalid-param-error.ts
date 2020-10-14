export class InvalidParamError extends Error {
  constructor (paramName?: string) {
    if (typeof paramName !== 'undefined' && paramName !== '') {
      super(`valide corretamente o(s) seguinte(s) campo(s) ${paramName}`)
    } else {
      super('valide corretamente todos os campos')
    }

    this.name = 'InvalidParamError'
  }
}
