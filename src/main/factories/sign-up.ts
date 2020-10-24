import { Controller } from '../../presentation/protocols/export-all'
import { SignUpController } from '../../presentation/controllers/sign-up/sign-up'
import { FieldValidationWithRegex } from '../../presentation/regEx/field-validation'
import { DatabaseAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogControllerDecorator } from '../decorators/log'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { NameValidatorAdapter, EmailValidatorAdapter, PasswordValidatorAdapter } from '../../utils/validation/export-all'

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
  const databaseAddAccount = new DatabaseAddAccount(encrypter, addAccountRepository)
  const fieldValidationWithRegex = makeFieldValidationWithRegex()
  const signUpController = new SignUpController(databaseAddAccount, fieldValidationWithRegex)
  const logErrorRepository = new LogMongoRepository()

  return new LogControllerDecorator(signUpController, logErrorRepository)
}
