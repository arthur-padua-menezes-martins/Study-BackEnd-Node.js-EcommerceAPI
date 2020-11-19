import {
  ValidationComposite,
  CompareFieldsValidator,
  RequiredFieldsValidator,
  ValidateFieldsValidator, mockFieldValidation,
  VerifyTypesValidator
} from '../user/mock-validation-composite-components'

export const validationCompositeStub = new ValidationComposite([
  { content: new CompareFieldsValidator(), type: 'compare_fields' },
  { content: new RequiredFieldsValidator(), type: 'required_fields' },
  { content: new ValidateFieldsValidator(mockFieldValidation()), type: 'validate_fields' },
  { content: new VerifyTypesValidator(), type: 'verify_types' }
])
