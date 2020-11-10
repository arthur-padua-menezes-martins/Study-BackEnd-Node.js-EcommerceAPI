import { IController, SignUpController } from './import-all'
import { accountValidation } from './sign-up/sign-up-controller-validation-composite-factory'
import { writeAccount } from './sign-up/sign-up-controller-add-account-factory'
import { updateAccount } from './sign-up/sign-up-controller-update-enabled-account-factory'
import { emailSender } from './sign-up/sign-up-controller-email-sender-factory'
import { makeLogErrorControllerDecorator } from '../decorators/log/error/log-error-controller-decorator-factory'

export const makeSignUpController = (): IController => {
  return makeLogErrorControllerDecorator(
    new SignUpController(
      accountValidation,
      writeAccount,
      updateAccount,
      emailSender
    )
  )
}
