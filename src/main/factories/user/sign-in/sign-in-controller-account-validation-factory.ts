import {
  ValidationComposite,
  CompareFieldsValidator, RequiredFieldsValidator, ValidateFieldsValidator, VerifyTypesValidator,
  FieldValidation
} from '../../../../presentation/helpers/validators/export-all'
import {
  EmailValidatorAdapter,
  PasswordValidatorAdapter
} from '../../../../infra/validators/regEx/field/export-all'

export const makeFieldValidation = (): FieldValidation => {
  return new FieldValidation({
    email: (new EmailValidatorAdapter()).isValid,
    password: (new PasswordValidatorAdapter()).isValid
  })
}

export const accountValidation = new ValidationComposite([
  { content: new ValidateFieldsValidator(makeFieldValidation()), type: 'validate fields' },
  { content: new RequiredFieldsValidator(), type: 'required fields' },
  { content: new VerifyTypesValidator(), type: 'verify types' },
  { content: new CompareFieldsValidator(), type: 'compare fields' }
])
