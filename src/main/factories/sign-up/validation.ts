import { ValidationComposite, RequiredFieldsValidator, VerifyTypesValidator, CompareFieldsValidator, ValidateFieldsValidator } from '../../../presentation/helpers/validators/export-all'
import { FieldValidationWithRegex, NameValidatorAdapter, EmailValidatorAdapter, PasswordValidatorAdapter } from '../../../presentation/helpers/regEx/export-all'

export const makeFieldValidationWithRegex = (): FieldValidationWithRegex => {
  return new FieldValidationWithRegex({
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
