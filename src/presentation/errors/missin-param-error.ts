export class MissingParamError extends Error {
  constructor (paramName?: string) {
    if (typeof paramName !== 'undefined' && paramName !== '') {
      super(`preencha corretamente o(s) campo(s) ${paramName}`)
    } else {
      super('preencha corretamente todos os campos')
    }

    this.name = 'MissingParamError'
  }
}
