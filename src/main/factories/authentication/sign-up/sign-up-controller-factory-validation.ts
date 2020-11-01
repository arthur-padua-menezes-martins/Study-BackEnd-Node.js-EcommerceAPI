import {
  ValidationComposite,
  CompareFieldsValidator, RequiredFieldsValidator, ValidateFieldsValidator, VerifyTypesValidator,
  FieldValidationWithRegEx
} from '../../../../presentation/helpers/validators/export-all'
import { NameValidatorAdapter, EmailValidatorAdapter, PasswordValidatorAdapter } from '../../../adapters/validation/regEx/field/export-all'

export const makeFieldValidationWithRegex = (): FieldValidationWithRegEx => {
  return new FieldValidationWithRegEx({
    name: (new NameValidatorAdapter()).isValid,
    email: (new EmailValidatorAdapter()).isValid,
    password: (new PasswordValidatorAdapter()).isValid
  })
}

export const validation = new ValidationComposite([
  { content: new ValidateFieldsValidator(makeFieldValidationWithRegex()), type: 'validate fields' },
  { content: new RequiredFieldsValidator(), type: 'required fields' },
  { content: new VerifyTypesValidator(), type: 'verify types' },
  { content: new CompareFieldsValidator(), type: 'compare fields' }
])
