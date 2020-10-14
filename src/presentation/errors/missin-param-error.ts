export class MissingParamError extends Error {
  constructor (paramName?: string) {
    if (typeof paramName !== 'undefined') {
      super(`preencha os campos ${paramName} corretamente`)
    } else {
      super('preencha corretamente todos os campos')
    }

    this.name = 'MissingParamError'
  }
}
