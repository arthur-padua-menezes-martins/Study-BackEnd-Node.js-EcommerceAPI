import { IController } from '../../../presentation/protocols/controller/controller'
import { SignUpController } from '../../../presentation/controllers/sign-up/sign-up-controller'
import { accountValidation } from './geral/account-validation-factory'
import { readAccount } from './sign-up/sign-up-controller-search-account-by-fields-factory'
import { writeAccount } from './sign-up/sign-up-controller-add-account-factory'
import { updateAccount } from './sign-up/sign-up-controller-update-enabled-account-factory'
import { emailSender } from './sign-up/sign-up-controller-email-sender-factory'
import { makeLogErrorControllerDecorator } from '../decorators/log/error/log-error-controller-decorator-factory'

export const makeSignUpController = (): IController => {
  return makeLogErrorControllerDecorator(new SignUpController(accountValidation, readAccount, writeAccount, updateAccount, emailSender))
}
