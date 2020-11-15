import { IHttpRequestBody } from '../../import-all'

interface IInformationsOfAddSurveyHttpRequestTypes {
  fields: string[]
  answersFields: string[]
  body: IHttpRequestBody['survey']
  bodyAnswer: IHttpRequestBody['survey']['answers'][0]
}

export const informationsOfAddSurveyHttpRequest: IInformationsOfAddSurveyHttpRequestTypes = {
  fields: ['question', 'answers'],
  answersFields: ['image', 'answer'],

  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }]
  },

  bodyAnswer: {
    image: 'any_image',
    answer: 'any_answer'
  }
}
