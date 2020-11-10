import {
  ValidationComposite,
  CompareFieldsValidator, RequiredFieldsValidator, ValidateFieldsValidator, VerifyTypesValidator,
  FieldValidation
} from '../../../../presentation/helpers/validators/export-all'
import {
  NameValidatorAdapter,
  EmailValidatorAdapter,
  PasswordValidatorAdapter
} from '../../../../infra/validators/regEx/field/export-all'
import {
  CpfValidatorAdapter
} from '../../../../infra/validators/algorithms/field/export-all'

export const makeFieldValidation = (): FieldValidation => {
  return new FieldValidation({
    name: (new NameValidatorAdapter()).isValid,
    email: (new EmailValidatorAdapter()).isValid,
    password: (new PasswordValidatorAdapter()).isValid,
    cpf: (new CpfValidatorAdapter()).isValid
  })
}

export const accountValidation = new ValidationComposite([
  { content: new ValidateFieldsValidator(makeFieldValidation()), type: 'validate_fields' },
  { content: new RequiredFieldsValidator(), type: 'required_fields' },
  { content: new VerifyTypesValidator(), type: 'verify_types' },
  { content: new CompareFieldsValidator(), type: 'compare_fields' }
])
