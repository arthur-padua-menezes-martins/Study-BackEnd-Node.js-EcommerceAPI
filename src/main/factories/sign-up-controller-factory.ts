import { Controller } from '../../presentation/protocols/controller/controller'
import { SignUpController } from '../../presentation/controllers/sign-up/sign-up-controller'
import { addAccount } from './sign-up/sign-up-controller-factory-add-account'
import { validation } from './sign-up/sign-up-controller-factory-validation'
import { LogMongoRepository } from '../../infra/db/mongodb/log/log-mongo-repository'
import { LogControllerDecorator } from '../decorators/log/log-controller-decorator'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(addAccount, validation)
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logErrorRepository)
}
