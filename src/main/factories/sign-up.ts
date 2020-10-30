import { Controller } from '../../presentation/protocols/export-all'
import { SignUpController } from '../../presentation/controllers/sign-up/sign-up'
import {
  ValidationComposite, RequiredFieldsValidator, VerifyTypesValidator, CompareFieldsValidator, ValidateFieldsValidator,
  FieldValidationWithRegex, NameValidatorAdapter, EmailValidatorAdapter, PasswordValidatorAdapter
} from '../../presentation/helpers/export-all'
import { DatabaseAddAccountController } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { LogControllerDecorator } from '../decorators/log'

const makeFieldValidationWithRegex = (): FieldValidationWithRegex => {
  return new FieldValidationWithRegex({
    name: (new NameValidatorAdapter()).isValid,
    email: (new EmailValidatorAdapter()).isValid,
    password: (new PasswordValidatorAdapter()).isValid
  })
}

export const makeSignUpController = (): Controller => {
  const encrypter = new BcryptAdapter(12)
  const addAccountRepository = new AccountMongoRepository()
  const addAccountController = new DatabaseAddAccountController(encrypter, addAccountRepository)

  const validation = new ValidationComposite([
    { content: new ValidateFieldsValidator(makeFieldValidationWithRegex()), type: 'validate fields' },
    { content: new RequiredFieldsValidator(), type: 'required fields' },
    { content: new VerifyTypesValidator(), type: 'verify types' },
    { content: new CompareFieldsValidator(), type: 'compare fields' }
  ])
  const signUpController = new SignUpController(addAccountController, validation)
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logErrorRepository)
}
