import { SignUpController } from '../../presentation/controllers/sign-up/sign-up'
import { FieldValidationWithRegex } from '../../presentation/regEx/field-validation'
import { DatabaseAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { NameValidatorAdapter, EmailValidatorAdapter, PasswordValidatorAdapter } from '../../utils/validation/export-all'

const makeFieldValidationWithRegex = (): FieldValidationWithRegex => {
  return new FieldValidationWithRegex({
    name: (new NameValidatorAdapter()).isValid,
    email: (new EmailValidatorAdapter()).isValid,
    password: (new PasswordValidatorAdapter()).isValid
  })
}

export const makeSignUpController = (): SignUpController => {
  const bcryptAdapter = new BcryptAdapter(12)
  const accountMongoRepository = new AccountMongoRepository()
  const databaseAddAccount = new DatabaseAddAccount(bcryptAdapter, accountMongoRepository)
  const fieldValidationWithRegex = makeFieldValidationWithRegex()

  return new SignUpController(databaseAddAccount, fieldValidationWithRegex)
}
