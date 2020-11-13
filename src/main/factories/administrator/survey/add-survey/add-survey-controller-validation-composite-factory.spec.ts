import {
  surveyValidation
} from './add-survey-controller-validation-composite-factory'
import {
  informationsOfAddSurveyHttpRequestBodyFields, informationsOfAddSurveyHttpRequestBody
} from '../../../../utils/fake/informations-of/survey/add/fake-data-add-survey-http-request-body'

describe('', () => {
  test('shuold return an not empty array if validation don´t bypass', async () => {
    const validation: string[] = await surveyValidation.validate({
      type: 'required_fields',
      fields: informationsOfAddSurveyHttpRequestBodyFields,
      body: {
        ...informationsOfAddSurveyHttpRequestBody,
        question: undefined
      }
    })

    expect(validation).not.toEqual([])
  })
})
