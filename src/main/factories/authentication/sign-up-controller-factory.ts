import { IController } from '../../../presentation/protocols/controller/controller'
import { SignUpController } from '../../../presentation/controllers/sign-up/sign-up-controller'
import { addAccount } from './sign-up/sign-up-controller-factory-add-account'
import { validation } from './sign-up/sign-up-controller-factory-validation'
import { authentication } from './sign-in/sign-in-controller-factory-authentication'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { LogControllerDecorator } from '../../decorators/log/log-controller-decorator'

export const makeSignUpController = (): IController => {
  const signUpController = new SignUpController(addAccount, validation, authentication)
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logErrorRepository)
}
