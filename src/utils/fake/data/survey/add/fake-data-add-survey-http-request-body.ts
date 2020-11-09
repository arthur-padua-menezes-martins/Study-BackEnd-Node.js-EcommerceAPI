import { IHttpRequestBody } from '../../import-all'

export const fakeDataAddSurveyHttpRequestBody: IHttpRequestBody['survey'] = {
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
}
