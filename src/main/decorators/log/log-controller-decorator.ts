import { IController, IHttpRequest, IHttpResponse } from '../../../presentation/protocols/export-all'
import { LogErrorRepository } from '../../../data/protocols/repository/log/error/log-error-repository'

export class LogControllerDecorator implements IController {
  constructor (
    private readonly controller: IController,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)

    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logErrorStack(httpResponse.errorMessage?.stack)
    }

    return httpResponse
  }
}
