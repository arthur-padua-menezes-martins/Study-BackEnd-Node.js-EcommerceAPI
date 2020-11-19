import {
  FieldValidation,
  NameValidatorAdapter,
  EmailValidatorAdapter,
  PasswordValidatorAdapter
} from './make-field-validation-components'

export const makeFieldValidation = function (): FieldValidation {
  return new FieldValidation({
    name: (new NameValidatorAdapter()).isValid,
    email: (new EmailValidatorAdapter()).isValid,
    password: (new PasswordValidatorAdapter()).isValid
  })
}
