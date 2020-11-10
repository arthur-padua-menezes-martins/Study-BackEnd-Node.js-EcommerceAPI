import {
  ValidationComposite,
  RequiredFieldsValidator
} from '../../../../presentation/helpers/validators/export-all'

export const surveyValidation = new ValidationComposite([
  { content: new RequiredFieldsValidator(), type: 'required_fields' }
])
