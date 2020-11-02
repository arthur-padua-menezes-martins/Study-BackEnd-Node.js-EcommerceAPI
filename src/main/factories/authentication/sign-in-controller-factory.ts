import { IController } from '../../../presentation/protocols/controller/controller'
import { SignInController } from '../../../presentation/controllers/sign-in/sign-in-controller'
import { validation } from './sign-in/sign-in-controller-factory-validation'
import { authentication } from './sign-in/sign-in-controller-factory-authentication'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { LogControllerDecorator } from '../../decorators/log/log-controller-decorator'

export const makeSignInController = (): IController => {
  const signInController = new SignInController(validation, authentication)
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(signInController, logErrorRepository)
}
