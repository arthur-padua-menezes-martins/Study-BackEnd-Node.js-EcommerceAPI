import { IController } from '../../../../../presentation/protocols/controller/controller'
import { LogErrorMongoRepository } from '../../../../../infra/db/mongodb/log/error/log-error-mongo-repository'
import { LogControllerDecorator } from '../../../../decorators/log/log-controller-decorator'

export const makeLogErrorControllerDecorator = (controller: IController): IController => {
  const logErrorRepository = new LogErrorMongoRepository()
  return new LogControllerDecorator(controller, logErrorRepository)
}
