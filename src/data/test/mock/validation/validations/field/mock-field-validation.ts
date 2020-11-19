import {
  FieldValidation,
  NameValidatorAdapter,
  EmailValidatorAdapter,
  PasswordValidatorAdapter
} from './mock-field-validation-components'

export const mockFieldValidation = function (): FieldValidation {
  return new FieldValidation({
    name: (new NameValidatorAdapter()).isValid,
    email: (new EmailValidatorAdapter()).isValid,
    password: (new PasswordValidatorAdapter()).isValid
  })
}
