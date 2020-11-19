import {
  surveyValidation
} from './add-survey-controller-validation-composite-factory'
import {
  informationsOfAddSurveyHttpRequest
} from '../../../../../utils/fake/informations-of/survey/add/fake-informations-of-add-survey-http-request-body'

describe('', () => {
  test('shuold return an not empty array if validation don´t bypass', async () => {
    const validation: string[] = await surveyValidation.validate({
      type: 'required_fields',
      fields: informationsOfAddSurveyHttpRequest.fields,
      body: {
        ...informationsOfAddSurveyHttpRequest.body,
        question: ''
      }
    })

    expect(validation).not.toEqual([])
  })
})
