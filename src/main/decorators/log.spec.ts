import { Controller, IHttpRequest, IHttpResponse } from '../../presentation/protocols/export-all'
import { LogControllerDecorator } from './log'
import { LogErrorRepository } from '../../data/protocols/log-error-repository'
import {
  serverError,
  signUpHttpRequestBodyMatchComplete
} from '../../presentation/helpers/export-all'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
      const error = serverError(new Error())
      if (error.errorMessage) {
        error.errorMessage.stack = 'Error.prototype.stack'
      }

      const httpResponse = error

      return await Promise.resolve(httpResponse)
    }
  }

  return new ControllerStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stackError?: string): Promise<void> {
      return await Promise.resolve()
    }
  }

  return new LogErrorRepositoryStub()
}

interface ISystemUnderTestTypes {
  systemUnderTest: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}
const makeSystemUnderTest = (): ISystemUnderTestTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const systemUnderTest = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    systemUnderTest,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('LogErrorRepository', () => {
  test('Should call a LogErrorRepository if httpResponse contains server error <version: 0.0.1>', async () => {
    const { systemUnderTest, logErrorRepositoryStub } = makeSystemUnderTest()
    const spyOnLogErrorRepositoryStubLog = jest.spyOn(logErrorRepositoryStub, 'logError')

    await systemUnderTest.handle({ body: signUpHttpRequestBodyMatchComplete })
    expect(spyOnLogErrorRepositoryStubLog).toHaveBeenCalledWith('Error.prototype.stack')
  })
})
