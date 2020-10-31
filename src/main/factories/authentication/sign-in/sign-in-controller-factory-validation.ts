import {
  ValidationComposite,
  CompareFieldsValidator, RequiredFieldsValidator, ValidateFieldsValidator, VerifyTypesValidator,
  FieldValidationWithRegEx
} from '../../../../presentation/helpers/validators/export-all'
import { EmailValidatorAdapter, PasswordValidatorAdapter } from '../../../adapters/validation/regEx/field/export-all'

const makeFieldValidationWithRegEx = (): FieldValidationWithRegEx => {
  return new FieldValidationWithRegEx({
    email: (new EmailValidatorAdapter()).isValid,
    password: (new PasswordValidatorAdapter()).isValid
  })
}

export const validation = new ValidationComposite([
  { content: new CompareFieldsValidator(), type: 'compare fields' },
  { content: new RequiredFieldsValidator(), type: 'required fields' },
  { content: new ValidateFieldsValidator(makeFieldValidationWithRegEx()), type: 'validate fields' },
  { content: new VerifyTypesValidator(), type: 'verify types' }
])
