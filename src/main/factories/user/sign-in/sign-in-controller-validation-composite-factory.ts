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
  EmailValidatorAdapter,
  PasswordValidatorAdapter
} from '../../../../infra/validators/regEx/field/export-all'

export const fieldValidation = (): FieldValidation => {
  return new FieldValidation({
    email: (new EmailValidatorAdapter()).isValid,
    password: (new PasswordValidatorAdapter()).isValid
  })
}

export const accountValidation = new ValidationComposite([
  { content: new ValidateFieldsValidator(fieldValidation()), type: 'validate_fields' },
  { content: new RequiredFieldsValidator(), type: 'required_fields' },
  { content: new VerifyTypesValidator(), type: 'verify_types' },
  { content: new CompareFieldsValidator(), type: 'compare_fields' }
])
