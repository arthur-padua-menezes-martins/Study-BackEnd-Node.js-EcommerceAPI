export class ServerError extends Error {
  constructor () {
    super('um problema afetou o funcionamento do servidor, tente novamente em breve!')

    this.name = 'ServerError'
  }
}
