import {
  ValidationComposite,
  CompareFieldsValidator,
  RequiredFieldsValidator,
  ValidateFieldsValidator, makeFieldValidation,
  VerifyTypesValidator
} from './make-validation-composite-components'

export const validationCompositeStub = new ValidationComposite([
  { content: new CompareFieldsValidator(), type: 'compare_fields' },
  { content: new RequiredFieldsValidator(), type: 'required_fields' },
  { content: new ValidateFieldsValidator(makeFieldValidation()), type: 'validate_fields' },
  { content: new VerifyTypesValidator(), type: 'verify_types' }
])
