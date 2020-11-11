import { IHttpRequestBody } from '../../import-all'

export const informationsOfAddSurveyHttpRequestBodyFields: string[] = ['question', 'answers']

export const informationsOfAddSurveyHttpRequestBody: IHttpRequestBody['survey'] = {
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
}
export const informationsOfAddSurveyHttpRequestBodyAnswer: IHttpRequestBody['survey']['answers'][0] = {
  image: 'any_image',
  answer: 'any_answer'
}
