import {
  ValidationComposite,
  CompareFieldsValidator,
  RequiredFieldsValidator,
  ValidateFieldsValidator, makeFieldValidationWithRegEx,
  VerifyTypesValidator
} from './make-validation-composite-components'

export const validationCompositeStub = new ValidationComposite([
  { content: new CompareFieldsValidator(), type: 'compare fields' },
  { content: new RequiredFieldsValidator(), type: 'required fields' },
  { content: new ValidateFieldsValidator(makeFieldValidationWithRegEx()), type: 'validate fields' },
  { content: new VerifyTypesValidator(), type: 'verify types' }
])
