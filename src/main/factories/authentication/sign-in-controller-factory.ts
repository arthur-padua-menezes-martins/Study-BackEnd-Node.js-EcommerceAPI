import { Controller } from '../../../presentation/protocols/controller/controller'
import { SignInController } from '../../../presentation/controllers/sign-in/sign-in-controller'
import { authentication } from './sign-in/sign-in-controller-factory-authentication'
import { validation } from './sign-in/sign-in-controller-factory-validation'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { LogControllerDecorator } from '../../decorators/log/log-controller-decorator'

export const makeSignInController = (): Controller => {
  const signInController = new SignInController(authentication, validation)
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(signInController, logErrorRepository)
}
