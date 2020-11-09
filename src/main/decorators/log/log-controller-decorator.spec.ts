import {
  IController, IHttpResponse,
  LogControllerDecorator, LogErrorRepository,
  serverError,
  fakeDataSignUpHttpRequestBodyMatch
} from './import-all'

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle (): Promise<IHttpResponse> {
      const httpResponse = serverError(new Error())
      if (httpResponse.errorMessage) {
        httpResponse.errorMessage.stack = 'Error.prototype.stack'
      }

      return await Promise.resolve(httpResponse)
    }
  }

  return new ControllerStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logErrorStack (stackError?: string): Promise<void> {
      return await Promise.resolve()
    }
  }

  return new LogErrorRepositoryStub()
}

interface ISystemUnderTestTypes {
  systemUnderTest: LogControllerDecorator
  controllerStub: IController
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
    const spyOnLogErrorRepositoryStubLog = jest.spyOn(logErrorRepositoryStub, 'logErrorStack')

    await systemUnderTest.handle({ body: fakeDataSignUpHttpRequestBodyMatch })
    expect(spyOnLogErrorRepositoryStubLog).toHaveBeenCalledWith('Error.prototype.stack')
  })
})
