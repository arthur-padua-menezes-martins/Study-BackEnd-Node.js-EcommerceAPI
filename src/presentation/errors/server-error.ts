export class ServerError extends Error {
  constructor (errorStack: string | undefined) {
    super('um problema afetou o funcionamento do servidor, tente novamente em breve!')

    this.name = 'ServerError'
    this.stack = errorStack
  }
}
