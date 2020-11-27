import { IController, SignInController } from './import-all'
import { accountValidationComposite } from './sign-in/sign-in-controller-validation-composite-factory'
import { accountAuthentication } from './sign-in/sign-in-controller-authentication-account-factory'
import { makeLogErrorControllerDecorator } from '../decorators/log/error/log-error-controller-decorator-factory'

export const makeSignInController = (): IController => {
  return makeLogErrorControllerDecorator(
    new SignInController(
      accountValidationComposite,
      accountAuthentication
    )
  )
}
