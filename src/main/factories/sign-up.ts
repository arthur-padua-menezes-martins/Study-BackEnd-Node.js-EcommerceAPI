import { Controller } from '../../presentation/protocols/controller'
import { SignUpController } from '../../presentation/controllers/sign-up/sign-up'
import { addAccount } from './sign-up/add-account'
import { validation } from './sign-up/validation'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(addAccount, validation)
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logErrorRepository)
}
