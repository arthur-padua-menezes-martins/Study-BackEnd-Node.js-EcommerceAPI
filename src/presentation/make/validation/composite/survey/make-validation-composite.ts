import {
  ValidationComposite,
  CompareFieldsValidator,
  RequiredFieldsValidator,
  ValidateFieldsValidator, makeFieldValidation,
  VerifyTypesValidator
} from './../user/make-validation-composite-components'

export const validationCompositeStub = new ValidationComposite([
  { content: new CompareFieldsValidator(), type: 'compare fields' },
  { content: new RequiredFieldsValidator(), type: 'required fields' },
  { content: new ValidateFieldsValidator(makeFieldValidation()), type: 'validate fields' },
  { content: new VerifyTypesValidator(), type: 'verify types' }
])
