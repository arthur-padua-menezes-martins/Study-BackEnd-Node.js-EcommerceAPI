import { IHttpRequestBody } from '../../import-all'

export const fakeDataAddSurveyHttpRequestBodyFields: string[] = ['question', 'answers']

export const fakeDataAddSurveyHttpRequestBody: IHttpRequestBody['survey'] = {
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
}
export const fakeDataAddSurveyHttpRequestBodyAnswer: IHttpRequestBody['survey']['answers'][0] = {
  image: 'any_image',
  answer: 'any_answer'
}
