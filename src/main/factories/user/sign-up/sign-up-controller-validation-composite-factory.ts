import {
  ValidationComposite,
  FieldValidation
} from '../../../../presentation/helpers/validators/export-all'
import {
  CompareFieldsValidator
} from '../../../../presentation/helpers/validators/types/compare/compare-fields-validator'
import {
  RequiredFieldsValidator
} from '../../../../presentation/helpers/validators/types/required/user/authentication/required-fields-validator'
import {
  ValidateFieldsValidator
} from '../../../../presentation/helpers/validators/types/validation/validate-fields-validator'
import {
  VerifyTypesValidator
} from '../../../../presentation/helpers/validators/types/verify/verify-types-validator'
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
