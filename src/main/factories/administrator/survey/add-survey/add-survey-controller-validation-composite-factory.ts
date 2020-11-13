import {
  ValidationComposite
} from '../../../../../presentation/helpers/validators/export-all'
import {
  RequiredFieldsValidator
} from '../../../../../presentation/helpers/validators/types/required/administrator/survey/add/required-fields-validator'

export const surveyValidation = new ValidationComposite([
  { content: new RequiredFieldsValidator(), type: 'required_fields' }
])
