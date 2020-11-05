import {
  FieldValidationWithRegEx,
  NameValidatorAdapter,
  EmailValidatorAdapter,
  PasswordValidatorAdapter
} from './make-field-validation-with-reg-ex-components'

export const makeFieldValidationWithRegEx = function (): FieldValidationWithRegEx {
  return new FieldValidationWithRegEx({
    name: (new NameValidatorAdapter()).isValid,
    email: (new EmailValidatorAdapter()).isValid,
    password: (new PasswordValidatorAdapter()).isValid
  })
}
